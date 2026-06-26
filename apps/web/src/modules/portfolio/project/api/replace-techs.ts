import { apiHttpClient } from "@/infra/http/api-http-client";
import { type ApiResponse, isApiError } from "@/infra/http/dto/api-response";

export type ReplaceProjectTechsInput = {
	projectId: string;
	techs: Array<{ name: string; sortOrder: number }>;
};

export async function replaceProjectTechs({
	projectId,
	techs,
}: ReplaceProjectTechsInput): Promise<void> {
	const { data } = await apiHttpClient.put<ApiResponse<void>>(
		`/api/portfolio/projects/${projectId}/techs`,
		{ techs },
	);
	if (isApiError(data)) throw new Error(data.message);
}
