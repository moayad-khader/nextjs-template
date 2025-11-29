"use server";

const baseUrl = "https://fakestoreapi.com";

export async function getProducts() {
	const res = await fetch(`${baseUrl}/products`);
	return res.json();
}

export async function getProductById(id: number) {
	const res = await fetch(`${baseUrl}/products/${id}`);
	return res.json();
}

export async function createProduct(data: {
	title: string;
	price: number;
	description: string;
	category: string;
	image: string;
}) {
	const res = await fetch(`${baseUrl}/products`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	});
	return res.json();
}

export async function updateProduct(
	id: number,
	data: Partial<{
		title: string;
		price: number;
		description: string;
		category: string;
		image: string;
	}>,
) {
	const res = await fetch(`${baseUrl}/products/${id}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	});
	return res.json();
}

export async function deleteProduct(id: number) {
	const res = await fetch(`${baseUrl}/products/${id}`, {
		method: "DELETE",
	});
	return res.json();
}
