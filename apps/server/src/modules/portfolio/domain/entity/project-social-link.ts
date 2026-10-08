import { Id } from "@/domain/entity/id";

export type SocialPlatform = "instagram" | "x" | "linkedin" | "github" | "youtube" | "tiktok";

interface ConstructorProps {
	id: string;
	projectId: string;
	platform: SocialPlatform;
	username: string;
	sortOrder: number;
}

interface CreateProps {
	projectId: string;
	platform: SocialPlatform;
	username: string;
	sortOrder: number;
}

interface RestoreProps {
	id: string;
	projectId: string;
	platform: SocialPlatform;
	username: string;
	sortOrder: number;
}

export class ProjectSocialLink {
	readonly id: string;
	readonly projectId: string;
	readonly platform: SocialPlatform;
	readonly username: string;
	readonly sortOrder: number;

	private constructor({ id, projectId, platform, username, sortOrder }: ConstructorProps) {
		this.id = id;
		this.projectId = projectId;
		this.platform = platform;
		this.username = username;
		this.sortOrder = sortOrder;
	}

	static create({ projectId, platform, username, sortOrder }: CreateProps): ProjectSocialLink {
		return new ProjectSocialLink({ id: Id.create().value, projectId, platform, username, sortOrder });
	}

	static restore({ id, projectId, platform, username, sortOrder }: RestoreProps): ProjectSocialLink {
		return new ProjectSocialLink({ id, projectId, platform, username, sortOrder });
	}
}
