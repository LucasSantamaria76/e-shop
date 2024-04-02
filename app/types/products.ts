export interface IProduct {
	productId: string;
	name: string;
	description: string | null;
	categoryId: number;
	subcategoryId: number;
	images: string[];
	availableColours: string[];
	availableSizes: ISizes[];
}

export interface ISizes {
	name: string;
	sizes_id: number;
}
