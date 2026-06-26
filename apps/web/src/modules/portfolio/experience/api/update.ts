import { apiHttpClient } from "@/infra/http/api-http-client";
import { type ApiResponse, isApiError } from "@/infra/http/dto/api-response";
import type { WorkMode } from "../dto";

export type UpdateExperienceInput = {
	id: string;
	companyId: string;
	role: string;
	workMode: WorkMode;
	startDate: string;
	endDate?: string | null;
};

export async function updateExperience({
	id,
	...body
}: UpdateExperienceInput): Promise<void> {
	const { data } = await apiHttpClient.put<ApiResponse<void>>(
		`/api/portfolio/experiences/${id}`,
		body,
	);
	if (isApiError(data)) throw new Error(data.message);
}
