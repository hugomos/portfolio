interface UseDeleteProject {
	handleDeleteProject: ({ id }: { id: string }) => Promise<{ id: string }>;
	deleteProjectIsPending: boolean;
}

export function useDeleteProject(): UseDeleteProject {
	return {
		handleDeleteProject: ({ id }: { id: string }) =>
			new Promise((resolve) => resolve({ id })),
		deleteProjectIsPending: false,
	};
}
