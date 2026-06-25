import { ArrowUpRight } from "lucide-react";
import type React from "react";
import { Link } from "react-router";
import { type ExperienceDTO, workModeLabel } from "@/modules/portfolio/experience/dto";
import { Badge } from "@/presentation/components/ui/badge";
import { formatDate } from "../utils/date";

interface ExperienceItemProps {
	experience: ExperienceDTO;
}

export const ExperienceItem: React.FC<ExperienceItemProps> = ({
	experience,
}) => {
	const { company, role, workMode, startDate, endDate, highlights } =
		experience;

	const start = formatDate(startDate);
	const end = endDate ? formatDate(endDate) : "Present";

	return (
		<article className="grid gap-4 sm:grid-cols-[160px_1fr]">
			<div className="flex flex-col gap-1.5">
				{company.website ? (
					<Link
						to={company.website}
						target="_blank"
						rel="noopener noreferrer"
						className="group inline-flex items-center gap-1 font-medium text-sm hover:underline"
					>
						{company.name}
						<ArrowUpRight className="size-3 text-muted-foreground transition-colors group-hover:text-foreground" />
					</Link>
				) : (
					<span className="font-medium text-sm">{company.name}</span>
				)}
				<p className="text-muted-foreground text-xs">
					{start} – {end}
				</p>
				<Badge variant="outline" className="w-fit text-xs">
					{workModeLabel[workMode]}
				</Badge>
			</div>

			<div className="space-y-2">
				<p className="font-medium text-sm">{role}</p>
				<ul className="space-y-1">
					{highlights.map((h) => (
						<li key={h.id} className="flex gap-2 text-muted-foreground text-sm">
							<span
								aria-hidden="true"
								className="mt-2 size-1 shrink-0 rounded-full bg-muted-foreground/40"
							/>
							<span>{h.content}</span>
						</li>
					))}
				</ul>
			</div>
		</article>
	);
};
