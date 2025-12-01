import { queryOptions } from "@tanstack/react-query";
import { api } from "@/lib/api";
import endpoints from "@/lib/api/endpoints";
import type { UserProfile } from "./types";

export const userProfileQuery = queryOptions({
	queryKey: ["user", "profile"],
	queryFn: async () => {
		// Note: fakestoreapi doesn't have a /me endpoint, so we'll use a placeholder
		// In a real app, this would fetch the current user's profile
		const { data } = await api.get<UserProfile[]>(endpoints.user.all);
		return data[0]; // Return first user as placeholder
	},
});

export const dashboardStatsQuery = queryOptions({
	queryKey: ["dashboard", "stats"],
	queryFn: async () => {
		// Fetch products and users to compute stats
		const [productsRes, usersRes] = await Promise.all([
			api.get(endpoints.product.all),
			api.get(endpoints.user.all),
		]);

		return {
			totalProducts: productsRes.data.length,
			totalUsers: usersRes.data.length,
			recentActivity: [
				{
					id: 1,
					action: "Login",
					timestamp: new Date().toISOString(),
					description: "You logged in successfully",
				},
				{
					id: 2,
					action: "View",
					timestamp: new Date(Date.now() - 3600000).toISOString(),
					description: "Viewed product catalog",
				},
			],
		};
	},
});
