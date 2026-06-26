import { apiHttpClient } from "@/infra/http/api-http-client";
import { isApiError } from "@/infra/http/dto/api-response";

export type SignInInput = {
	email: string;
	password: string;
};

export async function signIn(input: SignInInput): Promise<void> {
	const { data } = await apiHttpClient.post(
		"/api/identity/auth/sign-in",
		input,
	);
	if (isApiError(data)) throw new Error(data.message);
}
