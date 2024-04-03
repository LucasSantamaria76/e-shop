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

export type TDetailsProduct = {
	color: string;
	images: string[];
	price: number;
	product_id: string;
	size_id: number;
	sizes: ISizes;
	slug: string;
	stock: number;
};