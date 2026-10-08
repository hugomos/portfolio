import { randomUUID } from "node:crypto";
import { extname } from "node:path";
import {
	DeleteObjectCommand,
	PutObjectCommand,
	S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { env } from "@portfolio/env/server";
import type { Upload } from "./upload";

export class UploadR2Adapter implements Upload {
	private readonly r2 = new S3Client({
		region: "auto",
		endpoint: env.CLOUDFLARE_R2_ENDPOINT,
		credentials: {
			accessKeyId: env.CLOUDFLARE_R2_ACCESS_KEY_ID,
			secretAccessKey: env.CLOUDFLARE_R2_SECRET_ACCESS_KEY,
		},
		// R2 usa path-style: endpoint/bucket/key (não virtual-hosted subdomain)
		forcePathStyle: true,
		// R2 não suporta checksums automáticos adicionados pelo AWS SDK v3
		requestChecksumCalculation: "WHEN_REQUIRED",
		responseChecksumValidation: "WHEN_REQUIRED",
	});

	async getUploadUrl({
		filename,
		contentType,
	}: Upload.GetInput): Promise<Upload.GetOutput> {
		const ext = extname(filename);
		const keyname = `${randomUUID()}${ext}`;
		const publicUrl = `${env.CLOUDFLARE_R2_PUBLIC_URL}/${keyname}`;

		const uploadUrl = await getSignedUrl(
			this.r2,
			new PutObjectCommand({
				Bucket: env.CLOUDFLARE_R2_BUCKET,
				Key: keyname,
				ContentType: contentType,
			}),
			{ expiresIn: 600 },
		);

		return { uploadUrl, publicUrl, keyname };
	}

	async deleteObject(keyname: string): Promise<void> {
		await this.r2.send(
			new DeleteObjectCommand({
				Bucket: env.CLOUDFLARE_R2_BUCKET,
				Key: keyname,
			}),
		);
	}
}
