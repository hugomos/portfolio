import { apiHttpClient } from "@/infra/http/api-http-client";
import { type ApiResponse, isApiError } from "@/infra/http/dto/api-response";
import type { ProjectDTO } from "../dto";

type ListProjectsOutput = ApiResponse<ProjectDTO[]>;

export async function listProjects(): Promise<ProjectDTO[]> {
	const { data } = await apiHttpClient.get<ListProjectsOutput>(
		"/api/portfolio/projects",
	);
	if (isApiError(data)) throw new Error(data.message);
	return data;
}
