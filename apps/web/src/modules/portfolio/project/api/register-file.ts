import { apiHttpClient } from "@/infra/http/api-http-client";
import { type ApiResponse, isApiError } from "@/infra/http/dto/api-response";

export type RegisterFileInput = {
	name: string;
	keyname: string;
	contentType: string;
	publicUrl: string;
};

export async function registerFile(
	input: RegisterFileInput,
): Promise<{ id: string }> {
	const { data } = await apiHttpClient.post<ApiResponse<{ id: string }>>(
		"/api/files",
		input,
	);
	if (isApiError(data)) throw new Error(data.message);
	return data as { id: string };
}
