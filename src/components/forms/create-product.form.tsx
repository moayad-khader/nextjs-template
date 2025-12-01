"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createProduct } from "@/features/products/actions";
import { productKeys } from "@/features/products/queries";
import {
	type CreateProductInput,
	createProductSchema,
} from "@/features/products/schema";

export function CreateProductForm() {
	const queryClient = useQueryClient();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<CreateProductInput>({
		resolver: zodResolver(createProductSchema) as never,
	});

	const createMutation = useMutation({
		mutationFn: createProduct,
		onSuccess: (newProduct) => {
			// Optimistically update the cache since FakeStore API doesn't persist
			queryClient.setQueryData(
				productKeys.all,
				(old: CreateProductInput[] | undefined) =>
					old ? [newProduct, ...old] : [newProduct],
			);
			reset();
		},
	});

	const onSubmit = (data: CreateProductInput) => {
		createMutation.mutate(data);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<FieldGroup>
				<Field data-invalid={!!errors.title}>
					<FieldLabel htmlFor="title">Title</FieldLabel>
					<Input
						id="title"
						{...register("title")}
						aria-invalid={!!errors.title}
					/>
					<FieldError>{errors.title?.message}</FieldError>
				</Field>

				<Field data-invalid={!!errors.price}>
					<FieldLabel htmlFor="price">Price</FieldLabel>
					<Input
						id="price"
						type="number"
						step="0.01"
						{...register("price")}
						aria-invalid={!!errors.price}
					/>
					<FieldError>{errors.price?.message}</FieldError>
				</Field>

				<Field data-invalid={!!errors.description}>
					<FieldLabel htmlFor="description">Description</FieldLabel>
					<Textarea
						id="description"
						{...register("description")}
						rows={3}
						aria-invalid={!!errors.description}
					/>
					<FieldError>{errors.description?.message}</FieldError>
				</Field>

				<Field data-invalid={!!errors.category}>
					<FieldLabel htmlFor="category">Category</FieldLabel>
					<Input
						id="category"
						{...register("category")}
						aria-invalid={!!errors.category}
					/>
					<FieldError>{errors.category?.message}</FieldError>
				</Field>

				<Field data-invalid={!!errors.image}>
					<FieldLabel htmlFor="image">Image URL</FieldLabel>
					<Input
						id="image"
						{...register("image")}
						aria-invalid={!!errors.image}
					/>
					<FieldError>{errors.image?.message}</FieldError>
				</Field>

				{createMutation.isError && (
					<FieldError>Error: {createMutation.error.message}</FieldError>
				)}

				{createMutation.isSuccess && (
					<p className="text-sm text-green-600 dark:text-green-400">
						Product created successfully!
					</p>
				)}

				<Button
					type="submit"
					disabled={createMutation.isPending}
					className="w-full"
				>
					{createMutation.isPending ? "Creating..." : "Create Product"}
				</Button>
			</FieldGroup>
		</form>
	);
}
