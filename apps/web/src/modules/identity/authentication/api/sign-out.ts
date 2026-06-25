import { apiHttpClient } from "@/infra/http/api-http-client";

export async function signOut(): Promise<void> {
	await apiHttpClient.post("/api/identity/auth/sign-out");
}
