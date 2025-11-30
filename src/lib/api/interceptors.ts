import type {
	AxiosError,
	AxiosResponse,
	InternalAxiosRequestConfig,
} from "axios";
import { notify } from "../ui-notifications";
import { getItem } from "./cookie";

export interface AuthCookie {
	key: "token" | "refresh_token";
	token: string;
	refresh_token: string;
}

export interface ApiError {
	message: string;
	status: number | undefined;
	isError: boolean;
}

export const requestInterceptor = (
	config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig => {
	const auth = getItem<AuthCookie>("auth");
	if (auth) {
		const token = auth[auth.key];
		config.headers.set("Authorization", `Bearer ${token}`);
	}
	return config;
};

export const successInterceptor = (response: AxiosResponse): AxiosResponse => {
	return response;
};

export const errorInterceptor = async (
	error: AxiosError<{ message?: string }>,
): Promise<never> => {
	const originalRequest = error.config as InternalAxiosRequestConfig & {
		_isRetry?: boolean;
	};
	const auth = getItem<AuthCookie>("auth");

	if (
		auth?.key === "token" &&
		!originalRequest?._isRetry &&
		error?.response?.status === 401
	) {
		// TODO: Implement token refresh logic
		// originalRequest._isRetry = true;
		// const res = await refreshToken();
		// if (res?.status === 200) { ... }
	}

	const apiError: ApiError = {
		status: error?.response?.status,
		isError: true,
		message:
			error?.response?.data?.message ||
			"Something Went Wrong, Please Try Again Later!",
	};

	if (error?.response?.status !== 401 && error.message !== "canceled") {
		notify(apiError.message, "error");
	}

	return Promise.reject(apiError);
};
