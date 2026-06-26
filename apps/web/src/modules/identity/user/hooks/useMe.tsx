import { useQuery } from "@tanstack/react-query";
import { me } from "../api/me";

export function useMe() {
	const { data: user, isLoading: userIsLoading } = useQuery({
		queryKey: ["me"],
		queryFn: me,
		retry: false,
		retryOnMount: false,
		refetchOnWindowFocus: false,
	});

	return { user, userIsLoading };
}
