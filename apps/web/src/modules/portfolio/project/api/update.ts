import { apiHttpClient } from "@/infra/http/api-http-client";
import { isApiError, type ApiResponse } from "@/infra/http/dto/api-response";
import type { ProjectCategory, ProjectStatus } from "../dto";

export type UpdateProjectInput = {
	id: string;
	title: string;
	summary: string;
	impact?: string | null;
	content?: string | null;
	category: ProjectCategory;
	status: ProjectStatus;
	repositoryUrl?: string | null;
	liveUrl?: string | null;
};

export async function updateProject({ id, ...body }: UpdateProjectInput): Promise<void> {
	const { data } = await apiHttpClient.put<ApiResponse<void>>(
		`/api/portfolio/projects/${id}`,
		body,
	);
	if (isApiError(data)) throw new Error(data.message);
}
