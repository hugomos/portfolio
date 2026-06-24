import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { useForm } from "react-hook-form";
import type { HeroDTO } from "@/modules/hero/dto";
import { type EditHeroFormSchema, editHeroFormSchema } from "./schema";

export function useEditHeroForm(hero: HeroDTO) {
	return useForm<EditHeroFormSchema>({
		resolver: standardSchemaResolver(editHeroFormSchema),
		defaultValues: {
			name: hero.name,
			title: hero.title,
			bio: hero.bio,
			skills: hero.skills.map((s) => ({
				name: s.name,
				sortOrder: s.sortOrder,
			})),
			links: {
				resumeUrl: hero.links.resumeUrl,
				githubUrl: hero.links.githubUrl,
				linkedinUrl: hero.links.linkedinUrl,
			},
		},
	});
}
