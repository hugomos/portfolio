interface UseUpdateHero {
	handleUpdateHero: (data: any) => Promise<void>;
	updateHeroIsPending: boolean;
}

export function useUpdateHero(): UseUpdateHero {
	return {
		handleUpdateHero: () => new Promise((resolve) => resolve()),
		updateHeroIsPending: false,
	};
}
