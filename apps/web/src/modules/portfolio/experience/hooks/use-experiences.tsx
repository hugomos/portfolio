import { useQuery } from "@tanstack/react-query";
import { listExperiences } from "../api/list";
import type { ExperienceDTO } from "../dto";

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
	const { data, isLoading: experiencesIsLoading } = useQuery({
		queryKey: ["experiences"],
		queryFn: listExperiences,
	});

	const experiences =
		visible !== undefined ? data?.filter((e) => e.visible === visible) : data;

	return { experiences, experiencesIsLoading };
}
