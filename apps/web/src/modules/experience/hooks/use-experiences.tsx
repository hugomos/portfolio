import type { ExperienceDTO } from "../dto";
import { mock } from "../mock";

interface UseExperiencesProps {
	visible?: boolean;
}

interface UseExperiences {
	experiences: ExperienceDTO[] | undefined;
	experiencesIsLoading: boolean;
}

export function useExperiences({
	visible,
}: UseExperiencesProps): UseExperiences {
	return {
		experiences: mock.filter((exp) => {
			if (visible === undefined) return true;
			return exp.visible === visible;
		}),
		experiencesIsLoading: false,
	};
}
