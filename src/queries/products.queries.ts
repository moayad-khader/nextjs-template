import { getProductById, getProducts } from "@/actions/products.actions";
import type { QueryDefinition } from "@/lib/query";
import type { Product } from "@/types/product";

// Query key factory
export const productKeys = {
	all: ["products"] as const,
	detail: (id: number) => [...productKeys.all, id] as const,
};

// Query definitions
export const productsQuery: QueryDefinition<Product[]> = {
	queryKey: productKeys.all,
	queryFn: getProducts,
};

export const productByIdQuery = (id: number): QueryDefinition<Product> => ({
	queryKey: productKeys.detail(id),
	queryFn: () => getProductById(id),
});
