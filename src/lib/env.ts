import { z } from "zod";

// Helper to validate URL strings (process.env values are always strings)
const urlString = (message?: string) =>
	z.string().refine(
		(val) => {
			try {
				new URL(val);
				return true;
			} catch {
				return false;
			}
		},
		{ message: message ?? "Invalid URL" },
	);

const serverSchema = z.object({
	NODE_ENV: z
		.enum(["development", "production", "test"])
		.default("development"),
	API_BASE_URL: urlString("API_BASE_URL must be a valid URL"),
});

const clientSchema = z.object({
	NEXT_PUBLIC_APP_URL: urlString().optional(),
});

const envSchema = serverSchema.extend(clientSchema.shape);

type Env = z.infer<typeof envSchema>;

function validateEnv(): Env {
	// Skip validation during static page generation if env vars aren't available
	// This can happen with build workers that don't inherit the full environment
	if (typeof window === "undefined" && !process.env.API_BASE_URL) {
		return {
			NODE_ENV: "production",
			API_BASE_URL: process.env.API_BASE_URL ?? "https://fakestoreapi.com",
			NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
		} as Env;
	}

	const parsed = envSchema.safeParse({
		NODE_ENV: process.env.NODE_ENV,
		API_BASE_URL: process.env.API_BASE_URL,
		NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
	});

	if (!parsed.success) {
		console.error("Env validation failed:", parsed.error.flatten().fieldErrors);
		throw new Error("Invalid environment variables");
	}

	return parsed.data;
}

export const env = validateEnv();

export type { Env };
