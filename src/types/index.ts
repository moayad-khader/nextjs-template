/**
 * Common type definitions used across the application
 */

/**
 * Generic API response wrapper
 */
export interface ApiResponse<T> {
	data: T;
	message?: string;
	success: boolean;
}

/**
 * Paginated response
 */
export interface PaginatedResponse<T> {
	data: T[];
	total: number;
	page: number;
	limit: number;
	totalPages: number;
}

/**
 * Pagination params for API requests
 */
export interface PaginationParams {
	page?: number;
	limit?: number;
	sort?: string;
	order?: "asc" | "desc";
}

/**
 * Base entity with common fields
 */
export interface BaseEntity {
	id: number;
	createdAt?: string;
	updatedAt?: string;
}

/**
 * Generic form state
 */
export interface FormState<T> {
	data: T | null;
	isLoading: boolean;
	error: string | null;
}

/**
 * Action result for server actions
 */
export type ActionResult<T = void> =
	| { success: true; data: T }
	| { success: false; error: string };

/**
 * Utility type to make specific properties optional
 */
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * Utility type to make specific properties required
 */
export type RequiredBy<T, K extends keyof T> = Omit<T, K> &
	Required<Pick<T, K>>;

/**
 * Utility type to extract the element type from an array
 */
export type ArrayElement<T> = T extends readonly (infer U)[] ? U : never;

/**
 * Utility type for async function return type
 */
export type AsyncReturnType<
	T extends (...args: unknown[]) => Promise<unknown>,
> = T extends (...args: unknown[]) => Promise<infer R> ? R : never;

/**
 * Utility type to make all properties nullable
 */
export type Nullable<T> = { [K in keyof T]: T[K] | null };

/**
 * Search/filter params
 */
export interface SearchParams {
	q?: string;
	filters?: Record<string, string | string[]>;
}
