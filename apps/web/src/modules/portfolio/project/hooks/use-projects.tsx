import { useQuery } from "@tanstack/react-query";
import { listProjects } from "../api/list";
import type { ProjectDTO } from "../dto";

interface UseProjectsProps {
	visible?: boolean;
}

interface UseProjects {
	projects: ProjectDTO[] | undefined;
	projectsIsLoading: boolean;
}

export function useProjects({ visible }: UseProjectsProps): UseProjects {
	const { data, isLoading: projectsIsLoading } = useQuery({
		queryKey: ["projects"],
		queryFn: listProjects,
	});

	const projects =
		visible !== undefined ? data?.filter((p) => p.visible === visible) : data;

	return { projects, projectsIsLoading };
}
