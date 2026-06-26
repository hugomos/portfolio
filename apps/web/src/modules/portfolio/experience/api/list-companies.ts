import { apiHttpClient } from "@/infra/http/api-http-client";
import { type ApiResponse, isApiError } from "@/infra/http/dto/api-response";
import type { CompanyDTO } from "../dto";

type ListCompaniesOutput = ApiResponse<CompanyDTO[]>;

export async function listCompanies(): Promise<CompanyDTO[]> {
	const { data } = await apiHttpClient.get<ListCompaniesOutput>(
		"/api/portfolio/companies",
	);
	if (isApiError(data)) throw new Error(data.message);
	return data;
}
