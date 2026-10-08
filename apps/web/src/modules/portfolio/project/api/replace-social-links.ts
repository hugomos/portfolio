import { apiHttpClient } from "@/infra/http/api-http-client";
import { type ApiResponse, isApiError } from "@/infra/http/dto/api-response";
import type { SocialPlatform } from "../dto";

export type ReplaceProjectSocialLinksInput = {
	projectId: string;
	socialLinks: Array<{
		platform: SocialPlatform;
		username: string;
		sortOrder: number;
	}>;
};

export async function replaceProjectSocialLinks({
	projectId,
	socialLinks,
}: ReplaceProjectSocialLinksInput): Promise<void> {
	const { data } = await apiHttpClient.put<ApiResponse<void>>(
		`/api/portfolio/projects/${projectId}/social-links`,
		{ socialLinks },
	);
	if (isApiError(data)) throw new Error(data.message);
}
