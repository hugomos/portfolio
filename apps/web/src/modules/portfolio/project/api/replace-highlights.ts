import { apiHttpClient } from "@/infra/http/api-http-client";
import { isApiError, type ApiResponse } from "@/infra/http/dto/api-response";

export type ReplaceProjectHighlightsInput = {
	projectId: string;
	highlights: Array<{ content: string; sortOrder: number }>;
};

export async function replaceProjectHighlights({
	projectId,
	highlights,
}: ReplaceProjectHighlightsInput): Promise<void> {
	const { data } = await apiHttpClient.put<ApiResponse<void>>(
		`/api/portfolio/projects/${projectId}/highlights`,
		{ highlights },
	);
	if (isApiError(data)) throw new Error(data.message);
}
