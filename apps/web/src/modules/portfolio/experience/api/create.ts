import { apiHttpClient } from "@/infra/http/api-http-client";
import { isApiError, type ApiResponse } from "@/infra/http/dto/api-response";
import type { WorkMode } from "../dto";

export type CreateExperienceInput = {
	companyId: string;
	role: string;
	workMode: WorkMode;
	startDate: string;
	endDate?: string | null;
	visible?: boolean;
};

export async function createExperience(input: CreateExperienceInput): Promise<void> {
	const { data } = await apiHttpClient.post<ApiResponse<void>>(
		"/api/portfolio/experiences",
		input,
	);
	if (isApiError(data)) throw new Error(data.message);
}
