import { apiHttpClient } from "@/infra/http/api-http-client";
import { type ApiResponse, isApiError } from "@/infra/http/dto/api-response";

export type ReplaceExperienceHighlightsInput = {
	experienceId: string;
	highlights: Array<{ content: string; sortOrder: number }>;
};

export async function replaceExperienceHighlights({
	experienceId,
	highlights,
}: ReplaceExperienceHighlightsInput): Promise<void> {
	const { data } = await apiHttpClient.put<ApiResponse<void>>(
		`/api/portfolio/experiences/${experienceId}/highlights`,
		{ highlights },
	);
	if (isApiError(data)) throw new Error(data.message);
}
