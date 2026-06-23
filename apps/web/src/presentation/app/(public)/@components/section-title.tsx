import type React from "react";

interface SectionTitleProps extends React.PropsWithChildren {}

export const SectionTitle: React.FC<SectionTitleProps> = ({ children }) => {
	return (
		<h2 className="text-sm uppercase tracking-widest text-muted-foreground">
			{children}
		</h2>
	);
};
