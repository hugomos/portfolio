import type React from "react";
import { SectionTitle } from "@/presentation/components/section-title";
import { Separator } from "@/presentation/components/ui/separator";
import { Skeleton } from "@/presentation/components/ui/skeleton";

export const ExperienceSkeleton: React.FC = () => {
	return (
		<section className="space-y-6">
			<SectionTitle>Experience</SectionTitle>
			<div className="space-y-6">
				{[0, 1, 2].map((i) => (
					<div key={i} className="space-y-6">
						<div className="grid gap-4 sm:grid-cols-[160px_1fr]">
							<div className="flex flex-col gap-2">
								<Skeleton className="h-3.5 w-28" />
								<Skeleton className="h-3 w-20" />
								<Skeleton className="h-5 w-16 rounded-full" />
							</div>
							<div className="space-y-3">
								<Skeleton className="h-3.5 w-36" />
								<div className="space-y-2">
									<Skeleton className="h-3 w-full" />
									<Skeleton className="h-3 w-5/6" />
									<Skeleton className="h-3 w-4/6" />
								</div>
							</div>
						</div>
						{i < 2 && <Separator />}
					</div>
				))}
			</div>
		</section>
	);
};
