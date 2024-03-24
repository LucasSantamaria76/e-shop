export interface IProductInStock {
	size_id: number;
	color_id: string;
	stock: number;
	price: number;
	images: string[];
}

export interface IProduct {
	product_id: string;
	name: string;
	slug: string;
	description: string;
	images: string[];
	products_in_stock: IProductInStock[];
}
