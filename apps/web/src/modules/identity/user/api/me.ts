import { apiHttpClient } from "@/infra/http/api-http-client";
import { type ApiResponse, isApiError } from "@/infra/http/dto/api-response";
import type { UserDTO } from "../dto";

export async function me(): Promise<UserDTO> {
	const { data } = await apiHttpClient.post<ApiResponse<UserDTO>>(
		"/api/identity/user/me",
	);
	if (isApiError(data)) throw new Error(data.message);

	return data;
}
