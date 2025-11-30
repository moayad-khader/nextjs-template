"use server";

import { api } from "@/lib/api";
import endpoints from "@/lib/api/endpoints";
import type { Product } from "@/features/products/types";

export async function getProducts(): Promise<Product[]> {
	const { data } = await api.get<Product[]>(endpoints.product.all);
	return data;
}

export async function getProductById(id: number): Promise<Product> {
	const { data } = await api.get<Product>(`${endpoints.product.all}/${id}`);
	return data;
}

export async function createProduct(input: {
	title: string;
	price: number;
	description: string;
	category: string;
	image: string;
}) {
	const { data } = await api.post<Product>(endpoints.product.all, input);
	return data;
}

export async function updateProduct(
	id: number,
	input: Partial<{
		title: string;
		price: number;
		description: string;
		category: string;
		image: string;
	}>,
) {
	const { data } = await api.put<Product>(
		`${endpoints.product.all}/${id}`,
		input,
	);
	return data;
}

export async function deleteProduct(id: number) {
	const { data } = await api.delete<Product>(`${endpoints.product.all}/${id}`);
	return data;
}
