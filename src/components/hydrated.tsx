import { HydrationBoundary } from "@tanstack/react-query";
import { prefetch, type QueryDefinition } from "@/lib/query";
import type { ReactNode } from "react";

type HydratedProps = {
	queries: QueryDefinition[];
	children: ReactNode;
};

export async function Hydrated({ queries, children }: HydratedProps) {
	const state = await prefetch(...queries);

	return <HydrationBoundary state={state}>{children}</HydrationBoundary>;
}
