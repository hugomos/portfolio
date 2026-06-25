import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { useForm } from "react-hook-form";
import { type SignInFormSchema, signInFormSchema } from "./schema";

export function useSignInForm() {
	return useForm<SignInFormSchema>({
		resolver: standardSchemaResolver(signInFormSchema),
	});
}
