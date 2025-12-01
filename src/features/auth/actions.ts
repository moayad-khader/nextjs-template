"use server";

import { api } from "@/lib/api";
import endpoints from "@/lib/api/endpoints";
import type {
	LoginCredentials,
	LoginResponse,
	RegisterCredentials,
	User,
} from "./types";

export async function login(
	credentials: LoginCredentials,
): Promise<LoginResponse> {
	const { data } = await api.post<LoginResponse>(
		endpoints.auth.login,
		credentials,
	);
	return data;
}

export async function register(
	credentials: RegisterCredentials,
): Promise<User> {
	const { data } = await api.post<User>(endpoints.auth.register, {
		email: credentials.email,
		username: credentials.username,
		password: credentials.password,
		name: credentials.name,
	});
	return data;
}

export async function getCurrentUser(userId: number): Promise<User> {
	const { data } = await api.get<User>(`${endpoints.user.all}/${userId}`);
	return data;
}
