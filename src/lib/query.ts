import { dehydrate, QueryClient, type QueryKey } from "@tanstack/react-query";

type QueryDefinition<T> = {
	queryKey: QueryKey;
	queryFn: () => Promise<T>;
};

export async function prefetch<T>(...queries: QueryDefinition<T>[]) {
	const queryClient = new QueryClient();

	await Promise.all(
		queries.map((query) => queryClient.prefetchQuery(query))
	);

	return dehydrate(queryClient);
}

