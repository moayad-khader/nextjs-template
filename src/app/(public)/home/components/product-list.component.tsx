"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "@/features/products/actions";
import { productKeys, productsQuery } from "@/features/products/queries";
import type { Product } from "@/features/products/types";

export function ProductList() {
	const queryClient = useQueryClient();
	const { data: products, error } = useQuery(productsQuery);

	const deleteMutation = useMutation({
		mutationFn: deleteProduct,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: productKeys.all });
		},
	});

	if (error) return <div>Error: {error.message}</div>;

	return (
		<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
			{products?.map((product: Product) => (
				<div
					key={product.id}
					className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800"
				>
					<h3 className="font-medium">{product.title}</h3>
					<p className="text-sm text-zinc-500">${product.price}</p>
					<button
						type="button"
						onClick={() => deleteMutation.mutate(product.id)}
						disabled={deleteMutation.isPending}
						className="mt-2 text-sm text-red-500 hover:text-red-700 disabled:opacity-50"
					>
						{deleteMutation.isPending ? "Deleting..." : "Delete"}
					</button>
				</div>
			))}
		</div>
	);
}
