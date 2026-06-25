import { apiHttpClient } from "@/infra/http/api-http-client";
import { isApiError, type ApiResponse } from "@/infra/http/dto/api-response";

export type UpdateHeroInput = {
	name: string;
	title: string;
	bio: string;
	resumeUrl?: string | null;
	githubUrl?: string | null;
	linkedinUrl?: string | null;
};

export async function updateHero(input: UpdateHeroInput): Promise<void> {
	const { data } = await apiHttpClient.put<ApiResponse<void>>("/api/portfolio/hero", input);
	if (isApiError(data)) throw new Error(data.message);
}
