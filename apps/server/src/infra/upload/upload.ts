export interface Upload {
	getUploadUrl: (input: Upload.GetInput) => Promise<Upload.GetOutput>;
	deleteObject: (keyname: string) => Promise<void>;
}

export namespace Upload {
	export type GetInput = {
		filename: string;
		contentType: string;
	};

	export type GetOutput = {
		uploadUrl: string;
		publicUrl: string;
		keyname: string;
	};
}
