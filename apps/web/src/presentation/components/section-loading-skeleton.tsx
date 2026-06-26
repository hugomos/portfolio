import type React from "react";
import { TerminalCard, TerminalCursor, TerminalLine } from "./terminal-card";

export const SectionLoadingSkeleton: React.FC = () => {
	return (
		<div className="flex min-h-screen items-center justify-center">
			<TerminalCard>
				<TerminalLine>
					loading<TerminalCursor />
				</TerminalLine>
			</TerminalCard>
		</div>
	);
};
