import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { type SignInInput, signIn } from "../api/sign-in";

interface UseSignInProps {
	navigate: (path: string) => void;
}

interface UseSignIn {
	handleSignIn: (data: SignInInput) => Promise<void>;
	signInIsPending: boolean;
}

export function useSignIn({ navigate }: UseSignInProps): UseSignIn {
	const { mutateAsync: handleSignIn, isPending: signInIsPending } = useMutation(
		{
			mutationFn: signIn,
			onSuccess: () => {
				navigate("/~/admin");
			},
			onError: () => {
				toast.error("E-mail ou senha inválidos");
			},
		},
	);

	return { handleSignIn, signInIsPending };
}
