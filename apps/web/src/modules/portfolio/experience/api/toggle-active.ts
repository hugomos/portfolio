import { apiHttpClient } from "@/infra/http/api-http-client";
import { isApiError, type ApiResponse } from "@/infra/http/dto/api-response";

export async function toggleExperienceActive(id: string): Promise<void> {
	const { data } = await apiHttpClient.patch<ApiResponse<void>>(
		`/api/portfolio/experiences/${id}/toggle-active`,
	);
	if (isApiError(data)) throw new Error(data.message);
}
