import { type NextRequest, NextResponse } from "next/server";
import routes, { authRoutes, protectedRoutes } from "@/lib/routes";

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;
	const token = request.cookies.get("auth")?.value;

	const isAuthenticated = !!token;
	const isAuthRoute = authRoutes.includes(
		pathname as (typeof authRoutes)[number],
	);
	const isProtectedRoute = protectedRoutes.some((route) =>
		pathname.startsWith(route),
	);

	// Redirect authenticated users away from auth pages
	if (isAuthenticated && isAuthRoute) {
		return NextResponse.redirect(new URL(routes.home, request.url));
	}

	// Redirect unauthenticated users to login for protected routes
	if (!isAuthenticated && isProtectedRoute) {
		const loginUrl = new URL(routes.auth.login, request.url);
		loginUrl.searchParams.set("callbackUrl", pathname);
		return NextResponse.redirect(loginUrl);
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 * - public files (images, etc.)
		 */
		"/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|$).*)",
	],
};
