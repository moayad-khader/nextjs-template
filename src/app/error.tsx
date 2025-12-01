"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

function goHome() {
	window.location.href = "/";
}

export default function ErrorPage({
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
		<div className="flex min-h-screen flex-col items-center justify-center gap-4 p-4">
			<div className="text-center">
				<h1 className="text-4xl font-bold text-red-600 dark:text-red-400">
					Something went wrong!
				</h1>
				<p className="mt-2 text-muted-foreground">
					An unexpected error occurred. Please try again.
				</p>
				{error.digest && (
					<p className="mt-1 text-sm text-muted-foreground">
						Error ID: {error.digest}
					</p>
				)}
			</div>
			<div className="flex gap-2">
				<Button onClick={reset}>Try again</Button>
				<Button variant="outline" onClick={goHome}>
					Go home
				</Button>
			</div>
		</div>
	);
}
