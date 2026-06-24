interface UseUpdateProjectProps {
	navigate: (path: string) => void;
}

interface UseUpdateProject {
	handleUpdateProject: (data: any) => Promise<{ id: string }>;
	updateProjectIsPending: boolean;
}

export function useUpdateProject(_: UseUpdateProjectProps): UseUpdateProject {
	return {
		handleUpdateProject: () => new Promise((resolve) => resolve({ id: "" })),
		updateProjectIsPending: false,
	};
}
