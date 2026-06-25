import { Id } from "@/domain/entity/id";
import type { Skill } from "./skill";

interface ConstructorProps {
	id: string;
	name: string;
	title: string;
	bio: string;
	resumeUrl: string | null;
	githubUrl: string | null;
	linkedinUrl: string | null;
	updatedAt: Date;
	skills: Skill[];
}

interface CreateProps {
	name: string;
	title: string;
	bio: string;
	resumeUrl?: string | null;
	githubUrl?: string | null;
	linkedinUrl?: string | null;
}

interface RestoreProps {
	id: string;
	name: string;
	title: string;
	bio: string;
	resumeUrl: string | null;
	githubUrl: string | null;
	linkedinUrl: string | null;
	updatedAt: Date;
	skills: Skill[];
}

export class Hero {
	readonly id: string;
	readonly name: string;
	readonly title: string;
	readonly bio: string;
	readonly resumeUrl: string | null;
	readonly githubUrl: string | null;
	readonly linkedinUrl: string | null;
	readonly updatedAt: Date;
	private readonly _skills: Skill[];

	private constructor({
		id,
		name,
		title,
		bio,
		resumeUrl,
		githubUrl,
		linkedinUrl,
		updatedAt,
		skills,
	}: ConstructorProps) {
		this.id = id;
		this.name = name;
		this.title = title;
		this.bio = bio;
		this.resumeUrl = resumeUrl ?? null;
		this.githubUrl = githubUrl ?? null;
		this.linkedinUrl = linkedinUrl ?? null;
		this.updatedAt = updatedAt;
		this._skills = skills;
	}

	static create({
		name,
		title,
		bio,
		resumeUrl,
		githubUrl,
		linkedinUrl,
	}: CreateProps): Hero {
		return new Hero({
			id: Id.create().value,
			name,
			title,
			bio,
			resumeUrl: resumeUrl ?? null,
			githubUrl: githubUrl ?? null,
			linkedinUrl: linkedinUrl ?? null,
			updatedAt: new Date(),
			skills: [],
		});
	}

	static restore({
		id,
		name,
		title,
		bio,
		resumeUrl,
		githubUrl,
		linkedinUrl,
		updatedAt,
		skills,
	}: RestoreProps): Hero {
		return new Hero({
			id,
			name,
			title,
			bio,
			resumeUrl,
			githubUrl,
			linkedinUrl,
			updatedAt,
			skills,
		});
	}

	get skills(): Skill[] {
		return [...this._skills];
	}
}
