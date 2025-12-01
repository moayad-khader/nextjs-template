/**
 * API-related type definitions
 */

import type { AxiosError, AxiosResponse } from "axios";

/**
 * Custom API error type
 */
export interface ApiError {
	message: string;
	status: number | undefined;
	isError: boolean;
	code?: string;
	details?: Record<string, unknown>;
}

/**
 * Type guard for API errors
 */
export function isApiError(error: unknown): error is ApiError {
	return (
		typeof error === "object" &&
		error !== null &&
		"isError" in error &&
		(error as ApiError).isError === true
	);
}

/**
 * Generic API handler response
 */
export type ApiHandler<T> = Promise<AxiosResponse<T>>;

/**
 * Error response from API
 */
export interface ErrorResponse {
	message: string;
	errors?: Record<string, string[]>;
	statusCode: number;
}

/**
 * Type for mutation callbacks
 */
export interface MutationCallbacks<TData, TError = AxiosError> {
	onSuccess?: (data: TData) => void;
	onError?: (error: TError) => void;
	onSettled?: () => void;
}

/**
 * HTTP methods
 */
export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

/**
 * Request config
 */
export interface RequestConfig {
	method: HttpMethod;
	url: string;
	data?: unknown;
	params?: Record<string, unknown>;
	headers?: Record<string, string>;
}
