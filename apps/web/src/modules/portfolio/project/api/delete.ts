import { apiHttpClient } from "@/infra/http/api-http-client";
import { type ApiResponse, isApiError } from "@/infra/http/dto/api-response";

export async function deleteProject(id: string): Promise<void> {
	const { data } = await apiHttpClient.delete<ApiResponse<void>>(
		`/api/portfolio/projects/${id}`,
	);
	if (isApiError(data)) throw new Error(data.message);
}
