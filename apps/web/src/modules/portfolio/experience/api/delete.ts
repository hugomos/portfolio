import { apiHttpClient } from "@/infra/http/api-http-client";
import { type ApiResponse, isApiError } from "@/infra/http/dto/api-response";

export async function deleteExperience(id: string): Promise<void> {
	const { data } = await apiHttpClient.delete<ApiResponse<void>>(
		`/api/portfolio/experiences/${id}`,
	);
	if (isApiError(data)) throw new Error(data.message);
}
