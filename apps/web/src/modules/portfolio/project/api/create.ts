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

export async function createProject(input: CreateProjectInput): Promise<void> {
	const { data } = await apiHttpClient.post<ApiResponse<void>>(
		"/api/portfolio/projects",
		input,
	);
	if (isApiError(data)) throw new Error(data.message);
}
