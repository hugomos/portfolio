import { useQuery } from "@tanstack/react-query";
import { getHero } from "../api/get";
import type { HeroDTO } from "../dto";

interface UseHero {
	hero: HeroDTO | undefined;
	heroIsLoading: boolean;
}

export function useHero(): UseHero {
	const { data: hero, isLoading: heroIsLoading } = useQuery({
		queryKey: ["hero"],
		queryFn: getHero,
	});

	return { hero, heroIsLoading };
}
