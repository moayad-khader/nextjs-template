"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function PublicError({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 p-4">
			<div className="text-center">
				<h2 className="text-2xl font-bold text-red-600 dark:text-red-400">
					Something went wrong!
				</h2>
				<p className="mt-2 text-muted-foreground">
					We couldn&apos;t load this page. Please try again.
				</p>
			</div>
			<Button onClick={reset}>Try again</Button>
		</div>
	);
}
