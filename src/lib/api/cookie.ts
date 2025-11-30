import { deleteCookie, getCookie, setCookie } from "cookies-next";

const getItem = <T = unknown>(key: string): T | null => {
	const value = getCookie(key);
	if (!value) return null;
	return JSON.parse(value as string);
};

const setItem = (key: string, value: unknown) => {
	setCookie(key, value);
};
const delteItem = (key: string) => {
	deleteCookie(key);
};

export { getItem, setItem, delteItem };
