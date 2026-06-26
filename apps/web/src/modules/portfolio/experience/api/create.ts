import { apiHttpClient } from "@/infra/http/api-http-client";
import { type ApiResponse, isApiError } from "@/infra/http/dto/api-response";
import type { WorkMode } from "../dto";

export type CreateExperienceInput = {
	companyId: string;
	role: string;
	workMode: WorkMode;
	startDate: string;
	endDate?: string | null;
	visible?: boolean;
};

export async function createExperience(
	input: CreateExperienceInput,
): Promise<{ id: string }> {
	const { data } = await apiHttpClient.post<ApiResponse<{ id: string }>>(
		"/api/portfolio/experiences",
		input,
	);
	if (isApiError(data)) throw new Error(data.message);
	return data as { id: string };
}
