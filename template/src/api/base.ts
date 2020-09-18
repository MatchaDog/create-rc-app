import axios from "axios";
const BASE_URL: string = process.env.NODE_ENV === "development" ? "/api" : "";
import { AxiosResponse } from "axios";
interface IAxiosConfig {
	method: "GET" | "get" | "POST" | "post" | "PUT" | "put" | "DELETE" | "delete";
	params?: any;
	data?: any;
	headers?: { [index: string]: string };
}

axios.interceptors.request.use(
	(config) => {
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

// Add a response interceptor
axios.interceptors.response.use(
	(res) => {
		if (res.data.errcode === "0") {
			return Promise.resolve(res);
		}
		return Promise.reject(res);
	},
	(error) => {
		return Promise.reject(error);
	},
);

export function request<T>(
	url: string,
	config: IAxiosConfig,
): Promise<
	AxiosResponse<{
		code: string;
		errcode: string;
		message: string;
		obj: T;
	}>
> {
	const headers = {
		...config.headers,
		Accept: "application/json",
		"Content-Type": "application/json",
		"X-Requested-With": "XMLHttpRequest",
		"Access-Control-Allow-Headers": "Content-Type",
		"Access-Control-Allow-Methods": "POST, GET, OPTIONS",
		"Access-Control-Allow-Origin": "*",
		crossDomain: "true",
		"Access-Control-Expose-Headers": "Content-Disposition",
	};
	if (config.method === "get") {
		config.params = config.params || {};
	} else if (config.method === "post") {
		config.params = config.params || {};
	}
	return axios.request<{
		code: string;
		errcode: string;
		message: string;
		obj: T;
	}>({
		url: BASE_URL + url,
		headers,
		...config,
	});
}
