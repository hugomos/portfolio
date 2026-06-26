import { apiHttpClient } from "@/infra/http/api-http-client";
import { type ApiResponse, isApiError } from "@/infra/http/dto/api-response";
import type { ProjectCategory, ProjectStatus } from "../dto";

export type CreateProjectInput = {
	title: string;
	summary: string;
	impact?: string | null;
	content?: string | null;
	category: ProjectCategory;
	status: ProjectStatus;
	repositoryUrl?: string | null;
	liveUrl?: string | null;
	visible?: boolean;
};

export async function createProject(
	input: CreateProjectInput,
): Promise<{ id: string }> {
	const { data } = await apiHttpClient.post<ApiResponse<{ id: string }>>(
		"/api/portfolio/projects",
		input,
	);
	if (isApiError(data)) throw new Error(data.message);
	return data as { id: string };
}
