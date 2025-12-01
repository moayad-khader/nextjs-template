"use client";

import "@/app/globals.css";

export default function GlobalError({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<html lang="en">
			<body className="font-sans antialiased">
				<div className="flex min-h-screen flex-col items-center justify-center gap-4 p-4">
					<div className="text-center">
						<h1 className="text-3xl font-bold text-red-600 dark:text-red-400">
							Critical Error
						</h1>
						<p className="mt-2 text-muted-foreground">
							A critical error occurred. Please refresh the page.
						</p>
						{error.digest && (
							<p className="mt-1 text-sm text-muted-foreground">
								Error ID: {error.digest}
							</p>
						)}
					</div>
					<button
						type="button"
						onClick={reset}
						className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90 cursor-pointer"
					>
						Try again
					</button>
				</div>
			</body>
		</html>
	);
}
