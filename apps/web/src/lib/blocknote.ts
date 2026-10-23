import type { BlockNoteEditorOptions } from "@blocknote/core";

type PasteHandler = NonNullable<
	BlockNoteEditorOptions<any, any, any>["pasteHandler"]
>;

// Content is stored as Markdown, so pasted text is always parsed as Markdown.
// The default handler may pick the clipboard's HTML or VS Code data instead,
// which flattens paragraphs and turns code fences into plain text.
export const pasteAsMarkdown: PasteHandler = ({
	event,
	editor,
	defaultPasteHandler,
}) => {
	const types = event.clipboardData?.types ?? [];
	const text = event.clipboardData?.getData("text/plain");
	const inCodeBlock = editor.getTextCursorPosition().block.type === "codeBlock";

	if (
		!text ||
		inCodeBlock ||
		types.includes("Files") ||
		types.includes("blocknote/html")
	) {
		return defaultPasteHandler();
	}

	editor.pasteMarkdown(text);
	return true;
};
