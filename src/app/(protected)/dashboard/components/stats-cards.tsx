"use client";

import { useQuery } from "@tanstack/react-query";
import { Activity, Package, Users } from "lucide-react";
import { dashboardStatsQuery } from "@/features/dashboard";

export function StatsCards() {
	const { data: stats } = useQuery(dashboardStatsQuery);

	const cards = [
		{
			title: "Total Products",
			value: stats?.totalProducts ?? 0,
			icon: Package,
			color: "text-blue-600",
			bgColor: "bg-blue-100 dark:bg-blue-900/30",
		},
		{
			title: "Total Users",
			value: stats?.totalUsers ?? 0,
			icon: Users,
			color: "text-green-600",
			bgColor: "bg-green-100 dark:bg-green-900/30",
		},
		{
			title: "Recent Activity",
			value: stats?.recentActivity?.length ?? 0,
			icon: Activity,
			color: "text-purple-600",
			bgColor: "bg-purple-100 dark:bg-purple-900/30",
		},
	];

	return (
		<div className="grid gap-4 md:grid-cols-3">
			{cards.map((card) => (
				<div
					key={card.title}
					className="rounded-lg border bg-card p-6 shadow-sm"
				>
					<div className="flex items-center gap-4">
						<div className={`rounded-full p-3 ${card.bgColor}`}>
							<card.icon className={`h-6 w-6 ${card.color}`} />
						</div>
						<div>
							<p className="text-sm text-muted-foreground">{card.title}</p>
							<p className="text-2xl font-bold">{card.value}</p>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
