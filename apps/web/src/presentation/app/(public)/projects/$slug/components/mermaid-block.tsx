import mermaid from "mermaid";
import { useEffect, useState } from "react";

mermaid.initialize({
	startOnLoad: false,
	theme: "neutral",
	fontFamily: "JetBrains Mono Variable, monospace",
});

export const MermaidBlock: React.FC<{ chart: string }> = ({ chart }) => {
	const [svg, setSvg] = useState("");

	useEffect(() => {
		let cancelled = false;
		const id = `mermaid-${crypto.randomUUID().replace(/-/g, "")}`;

		mermaid
			.render(id, chart)
			.then(({ svg: rendered }) => {
				if (!cancelled) setSvg(rendered);
			})
			.catch(() => {
				if (!cancelled) setSvg(`<pre>${chart}</pre>`);
			});

		return () => {
			cancelled = true;
		};
	}, [chart]);

	return (
		<div
			// biome-ignore lint/security/noDangerouslySetInnerHtml: mermaid SVG output
			dangerouslySetInnerHTML={{ __html: svg }}
			className="my-6 overflow-x-auto"
		/>
	);
};
