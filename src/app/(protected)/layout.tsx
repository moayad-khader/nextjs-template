import type { ReactNode } from "react";

interface ProtectedLayoutProps {
	children: ReactNode;
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
	return (
		<div className="min-h-screen bg-background">
			<header className="border-b">
				<div className="container mx-auto flex h-16 items-center justify-between px-4">
					<h1 className="text-xl font-semibold">Dashboard</h1>
					<nav className="flex items-center gap-4">
						<a
							href="/home"
							className="text-sm text-muted-foreground hover:text-foreground"
						>
							Home
						</a>
					</nav>
				</div>
			</header>
			<main className="container mx-auto px-4 py-8">{children}</main>
		</div>
	);
}
