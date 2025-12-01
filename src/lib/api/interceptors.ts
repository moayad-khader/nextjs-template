import axios, {
	type AxiosError,
	type AxiosResponse,
	type InternalAxiosRequestConfig,
} from "axios";
import constants from "../constants";
import { notify } from "../ui-notifications";
import { deleteItem, getItem, setItem } from "./cookie";
import endpoints from "./endpoints";

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

interface RefreshTokenResponse {
	token: string;
	refresh_token?: string;
}

let isRefreshing = false;
let failedQueue: Array<{
	resolve: (value: unknown) => void;
	reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
	for (const prom of failedQueue) {
		if (error) {
			prom.reject(error);
		} else {
			prom.resolve(token);
		}
	}
	failedQueue = [];
};

const refreshToken = async (): Promise<RefreshTokenResponse | null> => {
	const auth = getItem<AuthCookie>("auth");
	if (!auth?.refresh_token) return null;

	try {
		const response = await axios.post<RefreshTokenResponse>(
			`${constants.API_BASE_URL}/${endpoints.auth.refresh}`,
			{ refresh_token: auth.refresh_token },
		);
		return response.data;
	} catch {
		return null;
	}
};

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
): Promise<unknown> => {
	const originalRequest = error.config as InternalAxiosRequestConfig & {
		_isRetry?: boolean;
	};
	const auth = getItem<AuthCookie>("auth");

	// Handle 401 errors with token refresh
	if (
		error?.response?.status === 401 &&
		auth?.refresh_token &&
		!originalRequest?._isRetry
	) {
		if (isRefreshing) {
			// Queue requests while refreshing
			return new Promise((resolve, reject) => {
				failedQueue.push({ resolve, reject });
			})
				.then((token) => {
					originalRequest.headers.set("Authorization", `Bearer ${token}`);
					return axios(originalRequest);
				})
				.catch((err) => Promise.reject(err));
		}

		originalRequest._isRetry = true;
		isRefreshing = true;

		try {
			const newTokens = await refreshToken();

			if (newTokens?.token) {
				// Update stored tokens
				setItem("auth", {
					key: "token",
					token: newTokens.token,
					refresh_token: newTokens.refresh_token || auth.refresh_token,
				});

				processQueue(null, newTokens.token);
				originalRequest.headers.set(
					"Authorization",
					`Bearer ${newTokens.token}`,
				);
				return axios(originalRequest);
			}

			// Refresh failed - clear auth and redirect
			deleteItem("auth");
			processQueue(error, null);
			window.location.href = "/login";
		} catch (refreshError) {
			processQueue(refreshError, null);
			deleteItem("auth");
			window.location.href = "/login";
		} finally {
			isRefreshing = false;
		}
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
