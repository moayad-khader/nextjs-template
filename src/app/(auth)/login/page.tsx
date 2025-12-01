import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "./components/login-form";

export const metadata: Metadata = {
	title: "Login",
	description: "Sign in to your account",
};

export default function LoginPage() {
	return (
		<div className="space-y-6">
			<div className="text-center">
				<h1 className="text-2xl font-bold">Welcome back</h1>
				<p className="mt-1 text-sm text-muted-foreground">
					Sign in to your account to continue
				</p>
			</div>

			<LoginForm />

			<p className="text-center text-sm text-muted-foreground">
				Don&apos;t have an account?{" "}
				<Link
					href="/register"
					className="font-medium text-primary underline-offset-4 hover:underline"
				>
					Sign up
				</Link>
			</p>
		</div>
	);
}
