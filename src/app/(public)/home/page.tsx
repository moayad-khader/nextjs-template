import { Suspense } from "react";
import { CreateProductForm } from "@/components/forms/create-product.form";
import { Hydrated } from "@/components/hydrated";
import { Loading } from "@/components/loading";
import { productsQuery } from "@/features/products/queries";
import { ProductList } from "./components/product-list.component";

export default function Home() {
	return (
		<div className="min-h-screen bg-zinc-50 p-8 font-sans dark:bg-black">
			<h1 className="mb-8 text-2xl font-bold">Products</h1>

			<div className="mb-8 max-w-md rounded-lg border border-zinc-200 p-6 dark:border-zinc-800">
				<h2 className="mb-4 text-lg font-semibold">Create Product</h2>
				<CreateProductForm />
			</div>

			<Suspense fallback={<Loading size="lg" text="Loading products..." />}>
				<Hydrated queries={[productsQuery]}>
					<ProductList />
				</Hydrated>
			</Suspense>
		</div>
	);
}
