import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { MermaidBlock } from "./mermaid-block";

export const MarkdownContent: React.FC<{ content: string }> = ({ content }) => {
	return (
		<ReactMarkdown
			remarkPlugins={[remarkGfm]}
			components={{
				h1: ({ children }) => (
					<h1 className="mt-8 mb-4 font-bold text-xl tracking-tight first:mt-0">
						{children}
					</h1>
				),
				h2: ({ children }) => (
					<h2 className="mt-6 mb-3 font-medium text-base first:mt-0">
						{children}
					</h2>
				),
				h3: ({ children }) => (
					<h3 className="mt-4 mb-2 font-medium text-muted-foreground text-sm first:mt-0">
						{children}
					</h3>
				),
				p: ({ children }) => (
					<p className="mb-4 text-muted-foreground text-sm leading-relaxed">
						{children}
					</p>
				),
				ul: ({ children }) => (
					<ul className="mb-4 ml-4 list-disc space-y-1 text-muted-foreground text-sm">
						{children}
					</ul>
				),
				ol: ({ children }) => (
					<ol className="mb-4 ml-4 list-decimal space-y-1 text-muted-foreground text-sm">
						{children}
					</ol>
				),
				li: ({ children }) => <li>{children}</li>,
				blockquote: ({ children }) => (
					<blockquote className="my-4 border-border border-l-2 pl-4 text-muted-foreground text-sm italic">
						{children}
					</blockquote>
				),
				strong: ({ children }) => (
					<strong className="font-semibold text-foreground">{children}</strong>
				),
				a: ({ href, children }) => (
					<a
						href={href}
						target="_blank"
						rel="noopener noreferrer"
						className="text-muted-foreground underline underline-offset-2 hover:text-foreground"
					>
						{children}
					</a>
				),
				table: ({ children }) => (
					<div className="my-4 overflow-x-auto">
						<table className="w-full border-collapse text-left">
							{children}
						</table>
					</div>
				),
				th: ({ children }) => (
					<th className="border border-border bg-muted px-3 py-2 font-medium text-muted-foreground text-xs">
						{children}
					</th>
				),
				td: ({ children }) => (
					<td className="border border-border px-3 py-2 text-muted-foreground text-xs">
						{children}
					</td>
				),
				hr: () => <hr className="my-6 border-border" />,
				pre: ({ children }) => <>{children}</>,
				code: ({ className, children }) => {
					const lang = /language-(\w+)/.exec(className || "")?.[1];

					if (lang === "mermaid") {
						return <MermaidBlock chart={String(children).trim()} />;
					}

					if (lang) {
						return (
							<pre className="my-4 overflow-x-auto rounded bg-muted p-4">
								<code className="text-xs">{children}</code>
							</pre>
						);
					}

					return (
						<code className="rounded bg-muted px-1.5 py-0.5 text-xs">
							{children}
						</code>
					);
				},
			}}
		>
			{content}
		</ReactMarkdown>
	);
};
