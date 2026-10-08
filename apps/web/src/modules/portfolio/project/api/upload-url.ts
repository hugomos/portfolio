import { apiHttpClient } from "@/infra/http/api-http-client";
import { type ApiResponse, isApiError } from "@/infra/http/dto/api-response";

export type GetUploadUrlResponse = {
	uploadUrl: string;
	publicUrl: string;
};

export async function getUploadUrl(
	filename: string,
	contentType: string,
): Promise<GetUploadUrlResponse> {
	const params = new URLSearchParams({ filename, contentType });
	const { data } = await apiHttpClient.get<ApiResponse<GetUploadUrlResponse>>(
		`/api/portfolio/projects/upload-url?${params}`,
	);
	if (isApiError(data)) throw new Error(data.message);
	return data as GetUploadUrlResponse;
}
