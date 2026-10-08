import type { Image } from "@/modules/images/domain/entity/image";

export interface FileRepo {
	findById(id: string): Promise<Image | null>;
	create(image: Image): Promise<void>;
	delete(id: string): Promise<void>;
}
