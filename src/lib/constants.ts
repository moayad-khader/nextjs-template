import { env } from "./env";

const constants = {
	API_BASE_URL: env.API_BASE_URL,
} as const;

export default constants;
