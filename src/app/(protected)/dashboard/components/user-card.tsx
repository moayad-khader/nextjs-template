"use client";

import { useQuery } from "@tanstack/react-query";
import { LogOut, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { userProfileQuery } from "@/features/dashboard";
import { deleteItem } from "@/lib/api/cookie";
import routes from "@/lib/routes";

export function UserCard() {
	const router = useRouter();
	const { data: user, isLoading } = useQuery(userProfileQuery);

	const handleLogout = () => {
		deleteItem("auth");
		router.push(routes.auth.login);
	};

	if (isLoading) {
		return (
			<div className="rounded-lg border bg-card p-6 shadow-sm">
				<div className="animate-pulse space-y-3">
					<div className="h-12 w-12 rounded-full bg-muted" />
					<div className="h-4 w-32 rounded bg-muted" />
					<div className="h-3 w-48 rounded bg-muted" />
				</div>
			</div>
		);
	}

	return (
		<div className="rounded-lg border bg-card p-6 shadow-sm">
			<div className="flex items-start justify-between">
				<div className="flex items-center gap-4">
					<div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
						<User className="h-6 w-6 text-primary" />
					</div>
					<div>
						<h3 className="font-semibold">
							{user?.name.firstname} {user?.name.lastname}
						</h3>
						<p className="text-sm text-muted-foreground">@{user?.username}</p>
						<p className="text-sm text-muted-foreground">{user?.email}</p>
					</div>
				</div>
				<Button variant="outline" size="sm" onClick={handleLogout}>
					<LogOut className="mr-2 h-4 w-4" />
					Logout
				</Button>
			</div>
		</div>
	);
}
