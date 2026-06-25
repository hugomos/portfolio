import { env } from "@portfolio/env/server";

export class TokenExpiry {
	private constructor(public readonly value: Date) {}

	static forRefreshToken(): TokenExpiry {
		const date = new Date();
		date.setDate(date.getDate() + env.REFRESH_TOKEN_EXPIRY_IN_DAYS);
		return new TokenExpiry(date);
	}

	static restore(value: Date): TokenExpiry {
		return new TokenExpiry(value);
	}

	isExpired(): boolean {
		return this.value < new Date();
	}
}
