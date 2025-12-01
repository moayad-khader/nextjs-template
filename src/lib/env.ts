import { z } from "zod";

const serverSchema = z.object({
	NODE_ENV: z
		.enum(["development", "production", "test"])
		.default("development"),
	API_BASE_URL: z.url("API_BASE_URL must be a valid URL"),
});

const clientSchema = z.object({
	NEXT_PUBLIC_APP_URL: z.url().optional(),
});

const envSchema = serverSchema.extend(clientSchema.shape);

type Env = z.infer<typeof envSchema>;

function validateEnv(): Env {
	const parsed = envSchema.safeParse({
		NODE_ENV: process.env.NODE_ENV,
		API_BASE_URL: process.env.API_BASE_URL,
		NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
	});

	if (!parsed.success) {
		throw new Error("Invalid environment variables");
	}

	return parsed.data;
}

export const env = validateEnv();

export type { Env };
