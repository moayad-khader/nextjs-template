"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { type LoginInput, login, loginSchema } from "@/features/auth";
import { setItem } from "@/lib/api/cookie";
import routes from "@/lib/routes";
import { notify } from "@/lib/ui-notifications";

export function LoginForm() {
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginInput>({
		resolver: zodResolver(loginSchema) as never,
	});

	const loginMutation = useMutation({
		mutationFn: login,
		onSuccess: (data) => {
			setItem("auth", {
				key: "token",
				token: data.token,
				refresh_token: "",
			});
			notify("Login successful!", "success");
			router.push(routes.home);
		},
		onError: (error) => {
			notify(error.message || "Login failed", "error");
		},
	});

	const onSubmit = (data: LoginInput) => {
		loginMutation.mutate(data);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<FieldGroup>
				<Field data-invalid={!!errors.username}>
					<FieldLabel htmlFor="username">Username</FieldLabel>
					<Input
						id="username"
						autoComplete="username"
						{...register("username")}
						aria-invalid={!!errors.username}
					/>
					<FieldError>{errors.username?.message}</FieldError>
				</Field>

				<Field data-invalid={!!errors.password}>
					<FieldLabel htmlFor="password">Password</FieldLabel>
					<Input
						id="password"
						type="password"
						autoComplete="current-password"
						{...register("password")}
						aria-invalid={!!errors.password}
					/>
					<FieldError>{errors.password?.message}</FieldError>
				</Field>

				{loginMutation.isError && (
					<FieldError>
						{loginMutation.error.message || "Invalid credentials"}
					</FieldError>
				)}

				<Button
					type="submit"
					disabled={loginMutation.isPending}
					className="w-full"
				>
					{loginMutation.isPending ? "Signing in..." : "Sign in"}
				</Button>
			</FieldGroup>
		</form>
	);
}
