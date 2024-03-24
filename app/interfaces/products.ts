export interface IProductInStockDB {
	product_id: string;
	size_id: number;
	color_id: string;
	stock: number;
	price: number;
	images: string[];
	products: IProductDB;
	colors: { name: string };
}

export interface IProductInStock {
	size: string;
	color: string;
	stock: number;
	price: number;
	images: string[];
}

export interface IProductDB {
	product_id?: string;
	name: string;
	slug: string;
	description: string;
	subcategory_id: number;
}

export interface IProduct {
	productId: string;
	name: string;
	stock: number;
	price: number;
	slug: string;
	description: string;
	subcategoryId: number;
	color: string;
	size: string;
	images: string[];
}
