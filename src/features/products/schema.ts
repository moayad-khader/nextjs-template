import { z } from "zod";

export const createProductSchema = z.object({
	title: z.string().min(3, "Title must be at least 3 characters"),
	price: z.coerce.number().min(0.01, "Price must be greater than 0"),
	description: z.string().min(10, "Description must be at least 10 characters"),
	category: z.string().min(1, "Category is required"),
	image: z.url("Must be a valid URL"),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
