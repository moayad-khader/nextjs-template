import { Hydrated } from "@/components/hydrated";
import { productsQuery } from "@/queries/products.queries";
import { ProductList } from "./product-list";

export default async function Home() {
	return (
		<Hydrated queries={[productsQuery]}>
			<div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
				<ProductList />
			</div>
		</Hydrated>
	);
}
