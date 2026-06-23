import type React from "react";

interface SectionTitleProps extends React.PropsWithChildren {}

export const SectionTitle: React.FC<SectionTitleProps> = ({ children }) => {
	return (
		<h2 className="text-muted-foreground text-sm uppercase tracking-widest">
			{children}
		</h2>
	);
};
