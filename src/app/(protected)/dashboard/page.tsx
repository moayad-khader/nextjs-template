import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import type { Metadata } from "next";
import { dashboardStatsQuery, userProfileQuery } from "@/features/dashboard";
import { getQueryClient } from "@/lib/query";
import { ActivityFeed } from "./components/activity-feed";
import { StatsCards } from "./components/stats-cards";
import { UserCard } from "./components/user-card";

export const metadata: Metadata = {
	title: "Dashboard",
	description: "Your personal dashboard",
};

export default async function DashboardPage() {
	const queryClient = getQueryClient();

	// Prefetch data on the server
	await Promise.all([
		queryClient.prefetchQuery(dashboardStatsQuery),
		queryClient.prefetchQuery(userProfileQuery),
	]);

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<div className="space-y-8">
				<div>
					<h1 className="text-3xl font-bold">Welcome back!</h1>
					<p className="text-muted-foreground">
						Here's what's happening with your account.
					</p>
				</div>

				<UserCard />

				<StatsCards />

				<div className="grid gap-4 lg:grid-cols-2">
					<ActivityFeed />
					<div className="rounded-lg border bg-card p-6 shadow-sm">
						<h3 className="mb-4 text-lg font-semibold">Quick Actions</h3>
						<div className="space-y-2">
							<a
								href="/home"
								className="block rounded-md border p-3 text-sm hover:bg-muted"
							>
								Browse Products →
							</a>
							<span className="block cursor-not-allowed rounded-md border p-3 text-sm text-muted-foreground">
								View Profile → (Coming soon)
							</span>
							<span className="block cursor-not-allowed rounded-md border p-3 text-sm text-muted-foreground">
								Settings → (Coming soon)
							</span>
						</div>
					</div>
				</div>
			</div>
		</HydrationBoundary>
	);
}
