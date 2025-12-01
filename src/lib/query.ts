import { dehydrate, QueryClient, type QueryKey } from "@tanstack/react-query";
import { cache } from "react";

export type QueryDefinition<T = unknown> = {
	queryKey: QueryKey;
	queryFn: () => Promise<T>;
};

/**
 * Get a memoized QueryClient for server-side usage.
 * This ensures the same client is used across a single request.
 */
export const getQueryClient = cache(
	() =>
		new QueryClient({
			defaultOptions: {
				queries: {
					staleTime: 60 * 1000, // 1 minute
				},
			},
		}),
);

export async function prefetch(...queries: QueryDefinition[]) {
	const queryClient = new QueryClient();

	await Promise.all(queries.map((query) => queryClient.prefetchQuery(query)));

	return dehydrate(queryClient);
}
