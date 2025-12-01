import type { Metadata } from "next";
import Link from "next/link";
import { RegisterForm } from "./components/register-form";

export const metadata: Metadata = {
	title: "Register",
	description: "Create a new account",
};

export default function RegisterPage() {
	return (
		<div className="space-y-6">
			<div className="text-center">
				<h1 className="text-2xl font-bold">Create an account</h1>
				<p className="mt-1 text-sm text-muted-foreground">
					Enter your details to get started
				</p>
			</div>

			<RegisterForm />

			<p className="text-center text-sm text-muted-foreground">
				Already have an account?{" "}
				<Link
					href="/login"
					className="font-medium text-primary underline-offset-4 hover:underline"
				>
					Sign in
				</Link>
			</p>
		</div>
	);
}
