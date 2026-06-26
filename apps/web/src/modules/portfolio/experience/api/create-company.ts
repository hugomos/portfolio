import { apiHttpClient } from "@/infra/http/api-http-client";
import { type ApiResponse, isApiError } from "@/infra/http/dto/api-response";

export type CreateCompanyInput = {
	name: string;
	website?: string | null;
};

export async function createCompany(
	input: CreateCompanyInput,
): Promise<{ id: string }> {
	const { data } = await apiHttpClient.post<ApiResponse<{ id: string }>>(
		"/api/portfolio/companies",
		input,
	);
	if (isApiError(data)) throw new Error(data.message);
	return data;
}
