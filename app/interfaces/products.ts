/* export interface IProductInStockDB {
	product_id: string;
	size_id?: number;
	color: string;
	stock: number;
	images: string[];
	price: number;
	slug: string;
	products_in_stock: IProductDB;
	sizes?: { name: string; sizes_id: number };
}

export interface IProductInStock {
	size: string;
	color: string;
	stock: number;
	price: number;
	images: string[];
}

export interface IProductDB {
	product_id: string;
	name: string;
	description: string;
	subcategory_id: number;
	category_id: number;
}

export interface IProductStore {
	[key: string]: {
		productId: string;
		name: string;
		slug: string;
		description: string;
		categoryId: number;
		subcategoryId: number;
		productsInStock: IProductInStockDB[];
		availableColours: string[];
		availableSizes: { name: string; id: number }[];
	};
}

export interface IProduct {
	productId: string;
	name: string;
	description: string;
	categoryId: number;
	subcategoryId: number;
	images: string[];
	availableColours: string[];
	availableSizes: { name: string; id: number }[];
} */
