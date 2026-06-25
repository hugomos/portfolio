import { apiHttpClient } from "@/infra/http/api-http-client";
import { isApiError, type ApiResponse } from "@/infra/http/dto/api-response";

export type UpdateCompanyInput = {
	id: string;
	name: string;
	website?: string | null;
};

export async function updateCompany({ id, ...body }: UpdateCompanyInput): Promise<void> {
	const { data } = await apiHttpClient.put<ApiResponse<void>>(
		`/api/portfolio/companies/${id}`,
		body,
	);
	if (isApiError(data)) throw new Error(data.message);
}
