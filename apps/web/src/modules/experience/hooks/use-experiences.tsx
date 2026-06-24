import type { ExperienceDTO } from "../dto";

interface UseExperiences {
	experiences: ExperienceDTO[] | undefined;
	experiencesIsLoading: boolean;
}

export function useExperiences(): UseExperiences {
	return {
		experiences: [],
		experiencesIsLoading: false,
	};
}
