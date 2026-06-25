/** biome-ignore-all lint/style/noNonNullAssertion: it's on purpose */
import { UseCase } from "@/domain/use-case";
import type { WorkMode } from "@/modules/portfolio/domain/entity/experience";
import type { ExperienceRepo } from "../db/repository";

type ExperienceItem = {
	id: string;
	role: string;
	workMode: WorkMode;
	startDate: string;
	endDate: string | null;
	visible: boolean;
	company: {
		id: string;
		name: string;
		website: string | null;
	};
	highlights: Array<{ content: string; sortOrder: number }>;
};

type Output = ExperienceItem[];

export class ListExperiencesUseCase extends UseCase<void, Output> {
	constructor(private readonly repo: ExperienceRepo) {
		super();
	}

	async execute(): Promise<Output> {
		const experiences = await this.repo.list();

		return experiences.map((experience) => ({
			id: experience.id,
			role: experience.role,
			workMode: experience.workMode,
			startDate: experience.startDate,
			endDate: experience.endDate,
			visible: experience.visible,
			company: {
				id: experience.company!.id,
				name: experience.company!.name,
				website: experience.company!.website,
			},
			highlights: experience.highlights.map(({ content, sortOrder }) => ({
				content,
				sortOrder,
			})),
		}));
	}
}
