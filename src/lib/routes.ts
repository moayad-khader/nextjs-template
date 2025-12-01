const routes = {
	home: "/home",
	dashboard: "/dashboard",
	auth: {
		login: "/login",
		register: "/register",
	},
} as const;

export default routes;

export const publicRoutes = [routes.home];
export const authRoutes = [routes.auth.login, routes.auth.register];
export const protectedRoutes = [routes.dashboard];
