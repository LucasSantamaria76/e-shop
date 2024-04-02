'use client';

import {
	ICategories,
	IColors,
	IData,
	IProductStore,
	IProductInStockDB,
	ISizes,
	ISubCategories,
} from '../interfaces';
import { supabase } from '../supabase/client';

export const initialGetData = async <IData>() => {
	const { data: dataSizes } = await supabase.from('sizes').select('*').order('sizes_id');
	//const { data: dataColors } = await supabase.from('colors').select('*');
	const { data: dataCategories } = await supabase.from('categories').select('*');
	const { data: dataSubCategories } = await supabase.from('subcategories').select('*');
	const { data: productsDB } = await supabase
		.from('products')
		.select('*,products_in_stock(color,stock,images,price,sizes(name,sizes_id))');

	const sizes: ISizes = dataSizes?.reduce((acc, value) => {
		acc[value.sizes_id] = {
			name: value.name,
			equivalence: value.equivalence,
			category_id: value.category_id,
		};
		return acc;
	}, {});

	/* const colors: IColors = dataColors?.reduce((acc, value) => {
		acc[value.color_id] = value.name;
		return acc;
	}, {}); */

	const categories: ICategories = dataCategories?.reduce((acc, value) => {
		acc[value.category_id] = value.name;
		return acc;
	}, {});

	const subCategories: ISubCategories = dataSubCategories?.reduce((acc, value) => {
		acc[value.subcategory_id] = {
			name: value.name,
			categoryId: value.category_id,
		};
		return acc;
	}, {});

	const products: IProductStore = productsDB?.reduce((acc, value) => {
		acc[value.slug] = {
			name: value.name,
			productId: value.product_id,
			slug: value.slug,
			description: value.description,
			categoryId: value.category_id,
			subcategoryId: value.subcategory_id,
			productsInStock: value.products_in_stock,
			availableColours: value.products_in_stock?.reduce(
				(acc: string[], value: IProductInStockDB) => {
					!acc.includes(value.color) && value.stock && acc.push(value.color);
					return acc;
				},
				[]
			),
			availableSizes: value.products_in_stock
				?.reduce((acc: { name: string; id: number }[], value: IProductInStockDB) => {
					!acc.filter((el) => el.name === value.sizes?.name!).length &&
						value.stock &&
						acc.push({ name: value.sizes?.name!, id: value.sizes?.sizes_id! });
					return acc;
				}, [])
				.sort((a: { name: string; id: number }, b: { name: string; id: number }) => a.id - b.id),
		};
		return acc;
	}, {});

	return { sizes, categories, subCategories, products };
};
