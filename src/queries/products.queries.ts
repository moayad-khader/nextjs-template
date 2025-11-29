import {
	getProductById,
	getProducts,
} from "@/actions/products.actions";

export const productsQuery = {
	queryKey: ["products"],
	queryFn: getProducts,
};

export const productByIdQuery = (id: number) => ({
	queryKey: ["products", id],
	queryFn: () => getProductById(id),
});

