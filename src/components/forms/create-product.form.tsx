"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
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
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
			<div>
				<label htmlFor="title" className="block text-sm font-medium">
					Title
				</label>
				<input
					id="title"
					{...register("title")}
					className="mt-1 w-full rounded border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
				/>
				{errors.title && (
					<p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
				)}
			</div>

			<div>
				<label htmlFor="price" className="block text-sm font-medium">
					Price
				</label>
				<input
					id="price"
					type="number"
					step="0.01"
					{...register("price")}
					className="mt-1 w-full rounded border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
				/>
				{errors.price && (
					<p className="mt-1 text-sm text-red-500">{errors.price.message}</p>
				)}
			</div>

			<div>
				<label htmlFor="description" className="block text-sm font-medium">
					Description
				</label>
				<textarea
					id="description"
					{...register("description")}
					rows={3}
					className="mt-1 w-full rounded border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
				/>
				{errors.description && (
					<p className="mt-1 text-sm text-red-500">
						{errors.description.message}
					</p>
				)}
			</div>

			<div>
				<label htmlFor="category" className="block text-sm font-medium">
					Category
				</label>
				<input
					id="category"
					{...register("category")}
					className="mt-1 w-full rounded border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
				/>
				{errors.category && (
					<p className="mt-1 text-sm text-red-500">{errors.category.message}</p>
				)}
			</div>

			<div>
				<label htmlFor="image" className="block text-sm font-medium">
					Image URL
				</label>
				<input
					id="image"
					{...register("image")}
					className="mt-1 w-full rounded border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
				/>
				{errors.image && (
					<p className="mt-1 text-sm text-red-500">{errors.image.message}</p>
				)}
			</div>

			{createMutation.isError && (
				<p className="text-sm text-red-500">
					Error: {createMutation.error.message}
				</p>
			)}

			{createMutation.isSuccess && (
				<p className="text-sm text-green-500">Product created successfully!</p>
			)}

			<button
				type="submit"
				disabled={createMutation.isPending}
				className="w-full rounded bg-zinc-900 px-4 py-2 text-white hover:bg-zinc-800 disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
			>
				{createMutation.isPending ? "Creating..." : "Create Product"}
			</button>
		</form>
	);
}
