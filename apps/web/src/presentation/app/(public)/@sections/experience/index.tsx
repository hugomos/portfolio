import type React from "react";
import { useExperiences } from "@/modules/portfolio/experience/hooks/use-experiences";
import { SectionTitle } from "@/presentation/components/section-title";
import { Separator } from "@/presentation/components/ui/separator";
import { ExperienceItem } from "./components/experience-item";
import { ExperienceSkeleton } from "./components/experience-skeleton";

export const Experience: React.FC = () => {
	const { experiences, experiencesIsLoading } = useExperiences({
		visible: true,
	});

	if (experiencesIsLoading) return <ExperienceSkeleton />;

	if (!experiences?.length) return null;

	return (
		<section className="space-y-6">
			<SectionTitle>Experience</SectionTitle>
			<div className="space-y-6">
				{experiences?.map((exp, index) => (
					<div key={exp.id} className="space-y-6">
						<ExperienceItem experience={exp} />
						{index < experiences.length - 1 && <Separator />}
					</div>
				))}
			</div>
		</section>
	);
};
