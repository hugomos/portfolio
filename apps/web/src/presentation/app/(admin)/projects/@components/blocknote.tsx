import {
	BlockNoteSchema,
	defaultBlockSpecs,
	filterSuggestionItems,
	type PartialBlock,
} from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import {
	useCreateBlockNote,
	getDefaultReactSlashMenuItems,
	SuggestionMenuController,
} from "@blocknote/react";
import { BlockNoteView } from "@blocknote/shadcn";
import "@blocknote/shadcn/style.css";
import { MermaidBlock, insertMermaid } from "@defensestation/blocknote-mermaid";
import type React from "react";

const schema = BlockNoteSchema.create({
  // @ts-ignore — MermaidBlock usa TiptapBlockImplementation incompatível com @blocknote/core@0.51
	blockSpecs: { ...defaultBlockSpecs, mermaid: MermaidBlock },
});

type EditorBlock = typeof schema.Block;

interface BlocknoteProps {
	initialContent?: PartialBlock[];
	onChange?: (blocks: EditorBlock[]) => void;
}

export const Blocknote: React.FC<BlocknoteProps> = ({
	initialContent,
	onChange,
}) => {
	const editor = useCreateBlockNote({
		schema,
		initialContent,
	});

	return (
		<BlockNoteView
			editor={editor}
			slashMenu={false}
			onChange={() => onChange?.(editor.document)}
		>
			{/* @ts-ignore — SuggestionMenuController espera suggestionMenuComponent/onItemClick em @blocknote/react@0.51 */}
			<SuggestionMenuController
				triggerCharacter="/"
				getItems={async (query) =>
					filterSuggestionItems(
						[...getDefaultReactSlashMenuItems(editor), insertMermaid()],
						query,
					)
				}
			/>
		</BlockNoteView>
	);
};
