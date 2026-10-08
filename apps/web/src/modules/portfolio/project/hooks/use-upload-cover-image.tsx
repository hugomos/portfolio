import { useState } from "react";
import { toast } from "sonner";
import { deleteFile } from "../api/delete-file";
import { registerFile } from "../api/register-file";
import { getUploadUrl } from "../api/upload-url";

export type CoverImageResult = {
	url: string;
	fileId: string;
};

interface UseUploadCoverImage {
	uploadCoverImage: (file: File) => Promise<CoverImageResult>;
	removeCoverImage: (fileId: string) => Promise<void>;
	isUploading: boolean;
	isRemoving: boolean;
}

export function useUploadCoverImage(): UseUploadCoverImage {
	const [isUploading, setIsUploading] = useState(false);
	const [isRemoving, setIsRemoving] = useState(false);

	async function uploadCoverImage(file: File): Promise<CoverImageResult> {
		setIsUploading(true);
		try {
			const { uploadUrl, publicUrl, keyname } = await getUploadUrl(
				file.name,
				file.type,
			);
			const response = await fetch(uploadUrl, {
				method: "PUT",
				body: file,
				headers: { "Content-Type": file.type },
			});
			if (!response.ok) {
				throw new Error(`R2 upload failed: ${response.status}`);
			}
			const { id: fileId } = await registerFile({
				name: file.name,
				keyname,
				contentType: file.type,
				publicUrl,
			});
			return { url: publicUrl, fileId };
		} catch (err) {
			console.error("[useUploadCoverImage] upload failed:", err);
			toast.error("Erro ao fazer upload da imagem");
			throw new Error("Upload failed");
		} finally {
			setIsUploading(false);
		}
	}

	async function removeCoverImage(fileId: string): Promise<void> {
		setIsRemoving(true);
		try {
			await deleteFile(fileId);
		} catch (err) {
			console.error("[useUploadCoverImage] remove failed:", err);
			toast.error("Erro ao remover imagem");
			throw new Error("Delete failed");
		} finally {
			setIsRemoving(false);
		}
	}

	return { uploadCoverImage, removeCoverImage, isUploading, isRemoving };
}
