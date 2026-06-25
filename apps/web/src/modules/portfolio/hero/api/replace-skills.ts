import { apiHttpClient } from "@/infra/http/api-http-client";
import { isApiError, type ApiResponse } from "@/infra/http/dto/api-response";
import type { Skill } from "../dto";

export type ReplaceSkillsInput = {
	skills: Skill[];
};

export async function replaceSkills(input: ReplaceSkillsInput): Promise<void> {
	const { data } = await apiHttpClient.put<ApiResponse<void>>(
		"/api/portfolio/hero/skills",
		input,
	);
	if (isApiError(data)) throw new Error(data.message);
}
