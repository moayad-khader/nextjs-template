import { HydrationBoundary } from "@tanstack/react-query";
import { prefetch } from "@/lib/query";
import { productsQuery } from "@/queries/products.queries";
import { ProductList } from "./product-list";

export default async function Home() {
	const state = await prefetch(productsQuery);

	return (
		<HydrationBoundary state={state}>
			<div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
				<ProductList />
			</div>
		</HydrationBoundary>
	);
}
