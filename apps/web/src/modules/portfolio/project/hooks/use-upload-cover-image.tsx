import { useState } from "react";
import { toast } from "sonner";
import { getUploadUrl } from "../api/upload-url";

interface UseUploadCoverImage {
	uploadCoverImage: (file: File) => Promise<string>;
	isUploading: boolean;
}

export function useUploadCoverImage(): UseUploadCoverImage {
	const [isUploading, setIsUploading] = useState(false);

	async function uploadCoverImage(file: File): Promise<string> {
		setIsUploading(true);
		try {
			const { uploadUrl, publicUrl } = await getUploadUrl(
				file.name,
				file.type,
			);
			await fetch(uploadUrl, {
				method: "PUT",
				body: file,
				headers: { "Content-Type": file.type },
			});
			return publicUrl;
		} catch {
			toast.error("Erro ao fazer upload da imagem");
			throw new Error("Upload failed");
		} finally {
			setIsUploading(false);
		}
	}

	return { uploadCoverImage, isUploading };
}
