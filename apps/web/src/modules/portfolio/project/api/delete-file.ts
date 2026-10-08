import { apiHttpClient } from "@/infra/http/api-http-client";
import { type ApiResponse, isApiError } from "@/infra/http/dto/api-response";

export async function deleteFile(fileId: string): Promise<void> {
	const { data } = await apiHttpClient.delete<ApiResponse<void>>(
		`/api/files/${fileId}`,
	);
	if (isApiError(data)) throw new Error(data.message);
}
