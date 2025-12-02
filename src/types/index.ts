export interface ApiResponse<T> {
	data: T;
	message?: string;
	success: boolean;
}

export interface PaginatedResponse<T> {
	data: T[];
	total: number;
	page: number;
	limit: number;
	totalPages: number;
}

export interface PaginationParams {
	page?: number;
	limit?: number;
	sort?: string;
	order?: "asc" | "desc";
}

export interface BaseEntity {
	id: number;
	createdAt?: string;
	updatedAt?: string;
}

export interface FormState<T> {
	data: T | null;
	isLoading: boolean;
	error: string | null;
}

export type ActionResult<T = void> =
	| { success: true; data: T }
	| { success: false; error: string };

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type RequiredBy<T, K extends keyof T> = Omit<T, K> &
	Required<Pick<T, K>>;

export type ArrayElement<T> = T extends readonly (infer U)[] ? U : never;

export type AsyncReturnType<
	T extends (...args: unknown[]) => Promise<unknown>,
> = T extends (...args: unknown[]) => Promise<infer R> ? R : never;

export type Nullable<T> = { [K in keyof T]: T[K] | null };

export interface SearchParams {
	q?: string;
	filters?: Record<string, string | string[]>;
}
