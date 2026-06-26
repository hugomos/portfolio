import { apiHttpClient } from "@/infra/http/api-http-client";
import { type ApiResponse, isApiError } from "@/infra/http/dto/api-response";

export async function toggleProjectActive(id: string): Promise<void> {
	const { data } = await apiHttpClient.patch<ApiResponse<void>>(
		`/api/portfolio/projects/${id}/toggle-active`,
	);
	if (isApiError(data)) throw new Error(data.message);
}
