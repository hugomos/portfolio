"use client";

import { ImageSquare, Trash, UploadSimple } from "@phosphor-icons/react";
import Image from "next/image";
import type React from "react";
import { useRef } from "react";
import { useUploadCoverImage } from "@/modules/portfolio/project/hooks/use-upload-cover-image";
import { Button } from "./ui/button";

interface CoverImageUploadProps {
	url: string | null;
	fileId: string | null;
	onUpload: (result: { url: string; fileId: string }) => void;
	onRemove: () => void;
}

export const CoverImageUpload: React.FC<CoverImageUploadProps> = ({
	url,
	fileId,
	onUpload,
	onRemove,
}) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const { uploadCoverImage, removeCoverImage, isUploading, isRemoving } =
		useUploadCoverImage();

	async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0];
		if (!file) return;
		try {
			const result = await uploadCoverImage(file);
			onUpload(result);
		} finally {
			if (inputRef.current) inputRef.current.value = "";
		}
	}

	async function handleRemove() {
		if (!fileId) return;
		try {
			await removeCoverImage(fileId);
			onRemove();
		} catch {
			// error already toasted in hook
		}
	}

	const isPending = isUploading || isRemoving;

	return (
		<div className="space-y-3">
			{url ? (
				<div className="relative aspect-video w-full overflow-hidden rounded-md border border-border">
					<Image
						src={url}
						alt="Cover image preview"
						fill
						className="object-cover"
					/>
				</div>
			) : (
				<div className="flex aspect-video w-full items-center justify-center rounded-md border border-dashed border-border bg-muted/40">
					<ImageSquare className="size-8 text-muted-foreground" />
				</div>
			)}

			<div className="flex gap-2">
				<Button
					type="button"
					variant="outline"
					size="sm"
					disabled={isPending}
					onClick={() => inputRef.current?.click()}
				>
					<UploadSimple data-icon="inline-start" />
					{isUploading ? "Enviando..." : url ? "Trocar imagem" : "Adicionar imagem"}
				</Button>

				{url && (
					<Button
						type="button"
						variant="ghost"
						size="sm"
						className="text-muted-foreground hover:text-destructive"
						disabled={isPending}
						onClick={handleRemove}
					>
						<Trash data-icon="inline-start" />
						{isRemoving ? "Removendo..." : "Remover"}
					</Button>
				)}
			</div>

			<input
				ref={inputRef}
				type="file"
				accept="image/*"
				className="hidden"
				onChange={handleFileChange}
			/>
		</div>
	);
};
