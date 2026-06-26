import { apiHttpClient } from "@/infra/http/api-http-client";
import { type ApiResponse, isApiError } from "@/infra/http/dto/api-response";
import type { HeroDTO } from "../dto";

type GetHeroOutput = ApiResponse<HeroDTO>;

export async function getHero(): Promise<HeroDTO> {
	const { data } = await apiHttpClient.get<GetHeroOutput>(
		"/api/portfolio/hero",
	);
	if (isApiError(data)) throw new Error(data.message);
	return data;
}
