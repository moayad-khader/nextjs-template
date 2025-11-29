"use client";

import { useQuery } from "@tanstack/react-query";
import { productsQuery } from "@/queries/products.queries";

export function ProductList() {
	const { data: products, isLoading, error } = useQuery(productsQuery);

	console.log(products);
	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error: {error.message}</div>;

	return <pre>{JSON.stringify(products, null, 2)}</pre>;
}

