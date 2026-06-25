import type { AuthToken } from "@/modules/identity/domain/entity/auth-token";

export interface AuthenticationRepo {
	create(token: AuthToken): Promise<void>;
	findByTokenHash(hash: string): Promise<AuthToken | null>;
	delete(tokenHash: string): Promise<void>;
	findAndMarkAsUsed(hash: string): Promise<AuthToken | null>;
}
