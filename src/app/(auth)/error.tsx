"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function AuthError({
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
		<div className="flex flex-col items-center justify-center gap-4 py-8 text-center">
			<h2 className="text-xl font-bold text-red-600 dark:text-red-400">
				Authentication Error
			</h2>
			<p className="text-muted-foreground">
				Something went wrong. Please try again.
			</p>
			<Button onClick={reset}>Try again</Button>
		</div>
	);
}
