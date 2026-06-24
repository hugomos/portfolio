import { Plus } from "lucide-react";
import type React from "react";
import { Link } from "react-router";
import { useExperiences } from "@/modules/experience/hooks/use-experiences";
import { SectionTitle } from "@/presentation/components/section-title";
import { Button } from "@/presentation/components/ui/button";
import { Separator } from "@/presentation/components/ui/separator";
import { ExperienceItem } from "./@components/experience-item";

export const Experiences: React.FC = () => {
	const { experiences } = useExperiences({});

	return (
		<main className="space-y-6">
			<div className="flex items-center justify-between">
				<SectionTitle as="h1">Experiences</SectionTitle>
				<Button variant="outline" size="sm" asChild>
					<Link to="/~/admin/experiences/new">
						<Plus data-icon="inline-start" />
						Add eperience
					</Link>
				</Button>
			</div>

			{experiences?.length === 0 ? (
				<p className="text-muted-foreground text-sm">No experiences yet.</p>
			) : (
				<div className="space-y-6">
					{experiences?.map((exp, index) => (
						<div key={exp.id} className="space-y-6">
							<ExperienceItem experience={exp} />
							{index < experiences.length - 1 && <Separator />}
						</div>
					))}
				</div>
			)}
		</main>
	);
};
