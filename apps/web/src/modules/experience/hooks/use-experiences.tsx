import type { ExperienceDTO } from "../dto";
import { mock } from "../mock";

interface UseExperiences {
	experiences: ExperienceDTO[] | undefined;
	experiencesIsLoading: boolean;
}

export function useExperiences(): UseExperiences {
	return {
		experiences: mock,
		experiencesIsLoading: false,
	};
}
