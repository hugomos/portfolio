import { apiHttpClient } from "@/infra/http/api-http-client";
import { type ApiResponse, isApiError } from "@/infra/http/dto/api-response";
import type { ExperienceDTO } from "../dto";

type ListExperiencesOutput = ApiResponse<ExperienceDTO[]>;

export async function listExperiences(): Promise<ExperienceDTO[]> {
	const { data } = await apiHttpClient.get<ListExperiencesOutput>(
		"/api/portfolio/experiences",
	);
	if (isApiError(data)) throw new Error(data.message);
	return data;
}
