import { apiHttpClient } from "@/infra/http/api-http-client";
import { type ApiResponse, isApiError } from "@/infra/http/dto/api-response";

export type MeOutput = {
	email: string;
	password: string;
};

export async function me(): Promise<MeOutput> {
	const { data } = await apiHttpClient.post<ApiResponse<MeOutput>>(
		"/api/identity/user/me",
	);
	if (isApiError(data)) throw new Error(data.message);

	return data;
}
