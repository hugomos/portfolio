import { UploadR2Adapter } from "./upload/r2-adapter";
import type { Upload } from "./upload/upload";

export class AdapterFactory {
	private readonly _uploadR2 = new UploadR2Adapter();

	upload(): Upload {
		return this._uploadR2;
	}
}

export const adapterFactory = new AdapterFactory();
