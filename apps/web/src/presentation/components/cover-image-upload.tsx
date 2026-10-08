"use client";

import { ImageSquare, Trash, UploadSimple } from "@phosphor-icons/react";
import Image from "next/image";
import type React from "react";
import { useRef } from "react";
import { useUploadCoverImage } from "@/modules/portfolio/project/hooks/use-upload-cover-image";
import { Button } from "./ui/button";

interface CoverImageUploadProps {
	value: string | null;
	onChange: (url: string | null) => void;
}

export const CoverImageUpload: React.FC<CoverImageUploadProps> = ({
	value,
	onChange,
}) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const { uploadCoverImage, isUploading } = useUploadCoverImage();

	async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0];
		if (!file) return;
		try {
			const url = await uploadCoverImage(file);
			onChange(url);
		} finally {
			if (inputRef.current) inputRef.current.value = "";
		}
	}

	return (
		<div className="space-y-3">
			{value ? (
				<div className="relative aspect-video w-full overflow-hidden rounded-md border border-border">
					<Image
						src={value}
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
					disabled={isUploading}
					onClick={() => inputRef.current?.click()}
				>
					<UploadSimple data-icon="inline-start" />
					{isUploading ? "Enviando..." : value ? "Trocar imagem" : "Adicionar imagem"}
				</Button>

				{value && (
					<Button
						type="button"
						variant="ghost"
						size="sm"
						className="text-muted-foreground hover:text-destructive"
						onClick={() => onChange(null)}
					>
						<Trash data-icon="inline-start" />
						Remover
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
