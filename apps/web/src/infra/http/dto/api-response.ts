export type ApiErrorResponse = { message: string };
export type ApiResponse<T> = T | ApiErrorResponse;

export function isApiError(res: unknown): res is ApiErrorResponse {
	return typeof res === "object" && res !== null && "message" in res;
}
