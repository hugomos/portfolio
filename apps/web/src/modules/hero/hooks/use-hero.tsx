import type { HeroDTO } from "../dto";
import { mock } from "../mock";

interface UseHero {
	hero: HeroDTO | undefined;
	heroIsLoading: boolean;
}

export function useHero(): UseHero {
	return {
		hero: mock,
		heroIsLoading: false,
	};
}
