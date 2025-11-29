"use client";

import { useQuery } from "@tanstack/react-query";
import { productsQuery } from "@/queries/products.queries";
import type { Product } from "@/types/product";

export function ProductList() {
	const { data: products, error } = useQuery(productsQuery);

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
				</div>
			))}
		</div>
	);
}
