import type React from "react";

interface SectionTitleProps extends React.PropsWithChildren {
	as?: "h1" | "h2" | "h3";
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
	children,
	as: Tag = "h2",
}) => {
	return (
		<Tag className="font-medium text-base">
			<span
				aria-hidden="true"
				className="mr-1.5 select-none text-muted-foreground"
			>
				//
			</span>
			{children}
		</Tag>
	);
};
