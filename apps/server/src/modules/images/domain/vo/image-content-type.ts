import { DomainError } from "@/domain/error/domain-error";

const ACCEPTED_TYPES = [
	"image/jpeg",
	"image/png",
	"image/webp",
	"image/gif",
	"image/svg+xml",
] as const;

export type AcceptedImageContentType = (typeof ACCEPTED_TYPES)[number];

export class ImageContentType {
	private constructor(public readonly value: AcceptedImageContentType) {}

	static create(value: string): ImageContentType {
		if (!ACCEPTED_TYPES.includes(value as AcceptedImageContentType)) {
			throw new DomainError(
				`Unsupported image type "${value}". Accepted: ${ACCEPTED_TYPES.join(", ")}`,
			);
		}
		return new ImageContentType(value as AcceptedImageContentType);
	}

	static restore(value: string): ImageContentType {
		return new ImageContentType(value as AcceptedImageContentType);
	}

	static get accepted(): readonly string[] {
		return ACCEPTED_TYPES;
	}
}
