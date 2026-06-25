import { useMutation } from "@tanstack/react-query";
import { signOut } from "../api/sign-out";

interface UseSignOutProps {
	navigate: (path: string) => void;
}

interface UseSignOut {
	handleSignOut: () => Promise<void>;
	signOutIsPending: boolean;
}

export function useSignOut({ navigate }: UseSignOutProps): UseSignOut {
	const { mutateAsync: handleSignOut, isPending: signOutIsPending } = useMutation({
		mutationFn: signOut,
		onSuccess: () => {
			navigate("/");
		},
	});

	return { handleSignOut, signOutIsPending };
}
