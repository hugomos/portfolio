import { TokenExpiry } from "../vo/token-expiry";

interface ConstructorParams {
	userId: string;
	tokenHash: string;
	expiresAt: TokenExpiry;
	usedAt: Date | null;
}

interface CreateParams {
	userId: string;
	tokenHash: string;
	expiresAt: TokenExpiry;
}

interface RestoreParams {
	userId: string;
	tokenHash: string;
	expiresAt: Date;
	usedAt: Date | null;
}

export class AuthToken {
	readonly userId: string;
	readonly tokenHash: string;
	readonly expiresAt: TokenExpiry;
	private _usedAt: Date | null;

	private constructor({
		userId,
		tokenHash,
		expiresAt,
		usedAt,
	}: ConstructorParams) {
		this.userId = userId;
		this.tokenHash = tokenHash;
		this.expiresAt = expiresAt;
		this._usedAt = usedAt;
	}

	static create({ userId, tokenHash, expiresAt }: CreateParams): AuthToken {
		return new AuthToken({ userId, tokenHash, expiresAt, usedAt: null });
	}

	static restore({
		userId,
		tokenHash,
		expiresAt,
		usedAt,
	}: RestoreParams): AuthToken {
		return new AuthToken({
			userId,
			tokenHash,
			expiresAt: TokenExpiry.restore(expiresAt),
			usedAt,
		});
	}

	isExpired(): boolean {
		return this.expiresAt.isExpired();
	}

	isUsed(): boolean {
		return this._usedAt !== null;
	}

	get usedAt() {
		return this._usedAt;
	}

	markAsUsed(): void {
		this._usedAt = new Date();
	}
}
