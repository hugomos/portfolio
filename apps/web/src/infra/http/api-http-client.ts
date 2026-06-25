/** biome-ignore-all lint/suspicious/useIterableCallbackReturn: it's on purpose */
import { env } from "@portfolio/env/web";
import axios, { type InternalAxiosRequestConfig } from "axios";

export const apiHttpClient = axios.create({
	baseURL: env.VITE_SERVER_URL,
	withCredentials: true,
});

type PendingRequest = {
	resolve: (value: unknown) => void;
	reject: (reason?: unknown) => void;
	config: InternalAxiosRequestConfig;
};

let isRefreshing = false;
let queue: PendingRequest[] = [];

apiHttpClient.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		const isRefreshEndpoint =
			originalRequest.url === "/api/identity/auth/refresh";

		if (
			error.response?.status !== 401 ||
			originalRequest._retry ||
			isRefreshEndpoint
		) {
			return Promise.reject(error);
		}

		if (isRefreshing) {
			return new Promise((resolve, reject) => {
				queue.push({ resolve, reject, config: originalRequest });
			});
		}

		originalRequest._retry = true;
		isRefreshing = true;

		try {
			await apiHttpClient.post("/api/identity/auth/refresh");
			queue.forEach(({ resolve, config }) => resolve(apiHttpClient(config)));
			queue = [];
			return apiHttpClient(originalRequest);
		} catch (refreshError) {
			queue.forEach(({ reject }) => reject(refreshError));
			queue = [];
			return Promise.reject(refreshError);
		} finally {
			isRefreshing = false;
		}
	},
);
