import slugify from "slugify"

export class Slug {
	private constructor(public readonly value: string) {}

	static create(title: string, replacement = "-"): Slug {
		const slug = slugify(title, {
			replacement,
			lower: true,
			strict: true,
			trim: true,
		})
		return new Slug(slug)
	}

	static restore(value: string): Slug {
		return new Slug(value)
	}
}
