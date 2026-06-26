import { randomUUID } from "node:crypto";

export class Id {
	private constructor(public readonly value: string) {}

	static create(): Id {
		const id = randomUUID();
		return new Id(id);
	}

	static restore(value: string): Id {
		return new Id(value);
	}
}
