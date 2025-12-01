"use client";

import { useQuery } from "@tanstack/react-query";
import { dashboardStatsQuery } from "@/features/dashboard";

export function ActivityFeed() {
	const { data: stats } = useQuery(dashboardStatsQuery);

	const formatTime = (timestamp: string) => {
		const date = new Date(timestamp);
		return date.toLocaleString();
	};

	return (
		<div className="rounded-lg border bg-card p-6 shadow-sm">
			<h3 className="mb-4 text-lg font-semibold">Recent Activity</h3>
			<div className="space-y-4">
				{stats?.recentActivity?.map((activity) => (
					<div
						key={activity.id}
						className="flex items-start gap-3 border-b pb-3 last:border-0"
					>
						<div className="mt-1 h-2 w-2 rounded-full bg-primary" />
						<div className="flex-1">
							<p className="font-medium">{activity.action}</p>
							<p className="text-sm text-muted-foreground">
								{activity.description}
							</p>
							<p className="mt-1 text-xs text-muted-foreground">
								{formatTime(activity.timestamp)}
							</p>
						</div>
					</div>
				))}
				{!stats?.recentActivity?.length && (
					<p className="text-center text-muted-foreground">
						No recent activity
					</p>
				)}
			</div>
		</div>
	);
}
