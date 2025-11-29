import { Suspense } from "react";
import { Hydrated } from "@/components/hydrated";
import { Loading } from "@/components/loading";
import { productsQuery } from "@/queries/products.queries";
import { ProductList } from "./product-list";

export default function Home() {
	return (
		<div className="min-h-screen bg-zinc-50 p-8 font-sans dark:bg-black">
			<h1 className="mb-8 text-2xl font-bold">Products</h1>
			<Suspense fallback={<Loading size="lg" text="Loading products..." />}>
				<Hydrated queries={[productsQuery]}>
					<ProductList />
				</Hydrated>
			</Suspense>
		</div>
	);
}
