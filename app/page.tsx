/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect } from 'react';
import { initialGetData } from './data';
import { useShopStore } from './store/shopStore';

/* 
import { CardProduct } from './components';
import { IProduct, IProductDB } from './interfaces/products';
import CreateSupabaseServerClient from './supabase/server';

const getProducts = async (): Promise<IProduct[] | any> => {
	try {
		const supabase = await CreateSupabaseServerClient();

		const { data, error } = await supabase
			.from('products')
			.select('*,products_in_stock(size_id,color_id,stock,images,price)');
		const { data: colors } = await supabase.from('colors').select('*');

		const { data: sizes } = await supabase.from('sizes').select('sizes_id, name');

		if (error) throw new Error(error.message);

		const products = data.map(
			({
				product_id,
				name,
				slug,
				description,
				subcategory_id,
				category_id,
				products_in_stock,
			}: IProductDB) => ({
				productId: product_id,
				name,
				stock: products_in_stock[0]?.stock,
				price: products_in_stock[0]?.price,
				slug,
				description,
				subcategoryId: subcategory_id,
				categoryId: category_id,
				color: colors?.find((el) => el.color_id === products_in_stock[0]?.color_id)?.name,
				size: sizes?.find((el) => el.sizes_id === products_in_stock[0]?.size_id)?.name,
				images: products_in_stock[0]?.images,
				sizesAvailable: products_in_stock.map(
					(product) => sizes?.find((el) => el.sizes_id === product?.size_id)?.name
				),
			})
		);

		return products;
	} catch (error) {
		console.log(error);
		return error;
	}
}; */

export default function Home() {
	const setSizes = useShopStore.use.setData();

	const setInitialData = async () => {
		const data = await initialGetData();

		setSizes(data);
	};

	useEffect(() => {
		setInitialData();
	}, []);

	return (
		<div className='flex flex-wrap w-11/12 mx-auto gap-2 mt-8'>
			{/* {products && products.map((product: IProduct) => <CardProduct key={product.productId} {...product} />)} */}
		</div>
	);
}
