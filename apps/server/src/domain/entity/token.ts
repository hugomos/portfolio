import { createHash, randomBytes, timingSafeEqual } from "node:crypto";

export class Token {
	private constructor(public readonly value: string) {}

	static create(): Token {
		return new Token(randomBytes(32).toString("hex"));
	}

	static restore(value: string): Token {
		return new Token(value);
	}

	hash(): string {
		return createHash("sha256").update(this.value).digest("hex");
	}

	static verify(rawToken: string, storedHash: string): boolean {
		const hash = createHash("sha256").update(rawToken).digest("hex");
		return timingSafeEqual(Buffer.from(hash), Buffer.from(storedHash));
	}
}
