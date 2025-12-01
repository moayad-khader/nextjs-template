export interface DashboardStats {
	totalProducts: number;
	totalUsers: number;
	recentActivity: ActivityItem[];
}

export interface ActivityItem {
	id: number;
	action: string;
	timestamp: string;
	description: string;
}

export interface UserProfile {
	id: number;
	email: string;
	username: string;
	name: {
		firstname: string;
		lastname: string;
	};
}
