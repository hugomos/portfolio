import type { ProjectDTO } from "../dto";
import { mock } from "../mock";

interface UseProjects {
	projects: ProjectDTO[] | undefined;
	projectsIsLoading: boolean;
}

export function useProjects(): UseProjects {
	return {
		projects: mock,
		projectsIsLoading: false,
	};
}
