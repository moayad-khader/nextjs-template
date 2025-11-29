import { dehydrate, QueryClient, type QueryKey } from "@tanstack/react-query";

export type QueryDefinition<T = unknown> = {
	queryKey: QueryKey;
	queryFn: () => Promise<T>;
};

export async function prefetch(...queries: QueryDefinition[]) {
	const queryClient = new QueryClient();

	await Promise.all(queries.map((query) => queryClient.prefetchQuery(query)));

	return dehydrate(queryClient);
}
