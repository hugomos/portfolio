import type React from "react";
import type { ExperienceDTO } from "@/modules/portfolio/experience/dto";
import { SectionTitle } from "@/presentation/components/section-title";
import { Separator } from "@/presentation/components/ui/separator";
import { ExperienceItem } from "./components/experience-item";

interface ExperienceProps {
	experiences: ExperienceDTO[];
}

export const Experience: React.FC<ExperienceProps> = ({ experiences }) => {
	if (!experiences.length) return null;

	return (
		<section className="space-y-6">
			<SectionTitle>Experience</SectionTitle>
			<div className="space-y-6">
				{experiences.map((exp, index) => (
					<div key={exp.id} className="space-y-6">
						<ExperienceItem experience={exp} />
						{index < experiences.length - 1 && <Separator />}
					</div>
				))}
			</div>
		</section>
	);
};
