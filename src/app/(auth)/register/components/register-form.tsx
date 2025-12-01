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
import {
	type RegisterInput,
	registerSchema,
	register as registerUser,
} from "@/features/auth";
import routes from "@/lib/routes";
import { notify } from "@/lib/ui-notifications";

export function RegisterForm() {
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterInput>({
		resolver: zodResolver(registerSchema) as never,
	});

	const registerMutation = useMutation({
		mutationFn: (data: RegisterInput) =>
			registerUser({
				email: data.email,
				username: data.username,
				password: data.password,
				name: {
					firstname: data.firstname,
					lastname: data.lastname,
				},
			}),
		onSuccess: () => {
			notify("Registration successful! Please sign in.", "success");
			router.push(routes.auth.login);
		},
		onError: (error) => {
			notify(error.message || "Registration failed", "error");
		},
	});

	const onSubmit = (data: RegisterInput) => {
		registerMutation.mutate(data);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<FieldGroup>
				<div className="grid grid-cols-2 gap-4">
					<Field data-invalid={!!errors.firstname}>
						<FieldLabel htmlFor="firstname">First name</FieldLabel>
						<Input
							id="firstname"
							autoComplete="given-name"
							{...register("firstname")}
							aria-invalid={!!errors.firstname}
						/>
						<FieldError>{errors.firstname?.message}</FieldError>
					</Field>

					<Field data-invalid={!!errors.lastname}>
						<FieldLabel htmlFor="lastname">Last name</FieldLabel>
						<Input
							id="lastname"
							autoComplete="family-name"
							{...register("lastname")}
							aria-invalid={!!errors.lastname}
						/>
						<FieldError>{errors.lastname?.message}</FieldError>
					</Field>
				</div>

				<Field data-invalid={!!errors.email}>
					<FieldLabel htmlFor="email">Email</FieldLabel>
					<Input
						id="email"
						type="email"
						autoComplete="email"
						{...register("email")}
						aria-invalid={!!errors.email}
					/>
					<FieldError>{errors.email?.message}</FieldError>
				</Field>

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
						autoComplete="new-password"
						{...register("password")}
						aria-invalid={!!errors.password}
					/>
					<FieldError>{errors.password?.message}</FieldError>
				</Field>

				<Field data-invalid={!!errors.confirmPassword}>
					<FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
					<Input
						id="confirmPassword"
						type="password"
						autoComplete="new-password"
						{...register("confirmPassword")}
						aria-invalid={!!errors.confirmPassword}
					/>
					<FieldError>{errors.confirmPassword?.message}</FieldError>
				</Field>

				{registerMutation.isError && (
					<FieldError>{registerMutation.error.message}</FieldError>
				)}

				<Button
					type="submit"
					disabled={registerMutation.isPending}
					className="w-full"
				>
					{registerMutation.isPending
						? "Creating account..."
						: "Create account"}
				</Button>
			</FieldGroup>
		</form>
	);
}
