export interface User {
	id: number;
	email: string;
	username: string;
	name: {
		firstname: string;
		lastname: string;
	};
}

export interface AuthState {
	user: User | null;
	token: string | null;
	isAuthenticated: boolean;
}

export interface LoginResponse {
	token: string;
}

export interface LoginCredentials {
	username: string;
	password: string;
}

export interface RegisterCredentials {
	email: string;
	username: string;
	password: string;
	name: {
		firstname: string;
		lastname: string;
	};
}
