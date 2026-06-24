interface useCreateProjectProps {
	navigate: (path: string) => void;
}

interface UseCreateProject {
	handleCreateProject: (data: any) => Promise<{ id: string }>;
	createProjectIsPending: boolean;
}

export function useCreateProject(_: useCreateProjectProps): UseCreateProject {
	return {
		handleCreateProject: () => new Promise((resolve) => resolve({ id: "" })),
		createProjectIsPending: false,
	};
}
