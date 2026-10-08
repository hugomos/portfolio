import { DomainError } from "@/domain/error/domain-error";
import { UseCase } from "@/domain/use-case";
import { ProjectSocialLink } from "@/modules/portfolio/domain/entity/project-social-link";
import type { SocialPlatform } from "@/modules/portfolio/domain/entity/project-social-link";
import type { ProjectRepo } from "../db/repository";

type Input = {
	id: string;
	socialLinks: Array<{ platform: SocialPlatform; username: string; sortOrder: number }>;
};

export class ReplaceProjectSocialLinksUseCase extends UseCase<Input, void> {
	constructor(private readonly repo: ProjectRepo) {
		super();
	}

	async execute({ id, socialLinks }: Input): Promise<void> {
		const project = await this.repo.findById(id);
		if (!project) throw new DomainError("Project not found");

		const entities = socialLinks.map(({ platform, username, sortOrder }) =>
			ProjectSocialLink.create({ projectId: id, platform, username, sortOrder }),
		);

		await this.repo.replaceSocialLinks(id, entities);
	}
}
