import type { ProjectDTO } from "../dto";
import { mock } from "../mock";

interface UseProjectsProps {
	visible?: boolean;
}

interface UseProjects {
	projects: ProjectDTO[] | undefined;
	projectsIsLoading: boolean;
}

export function useProjects({ visible }: UseProjectsProps): UseProjects {
	return {
		projects: mock.filter((p) => {
			if (visible === undefined) return true;
			return p.visible === visible;
		}),
		projectsIsLoading: false,
	};
}
