import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";
import constansts from "../constants";
import {
	errorInterceptor,
	requestInterceptor,
	successInterceptor,
} from "./interceptors";

const axiosRequestConfig: AxiosRequestConfig = {
	baseURL: constansts.API_BASE_URL,
	responseType: "json",
	headers: {
		"Content-Type": "application/json",
		"Access-Control-Allow-Origin": "*",
	},
};

const api: AxiosInstance = axios.create(axiosRequestConfig);

api.interceptors.request.use(requestInterceptor);
api.interceptors.response.use(successInterceptor, errorInterceptor);

export { api };
