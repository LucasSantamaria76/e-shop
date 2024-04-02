/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/app/supabase/client';
import { QueryData } from '@supabase/supabase-js';
import { ISizes } from '@/app/types';

const getProduct = async (id: string) => {
	try {
		const productIdQuery = supabase
			.from('products')
			.select('*,products_in_stock(*,sizes(sizes_id,name))')
			.eq('product_id', id)
			.single();

		type TProductQuery = QueryData<typeof productIdQuery>;

		const { data, error } = await productIdQuery;

		if (error) throw error;
		const product: TProductQuery = data;

		return product;
	} catch (error) {
		console.log(error);
	}
};

type TProduct = {
	category_id: number;
	description: string | null;
	name: string;
	product_id: string;
	subcategory_id: number;
	availableColours: string[] | null;
} | null;

type TDetailsProduct = {
	color: string;
	images: string[];
	price: number;
	product_id: string;
	size_id: number;
	slug: string;
	stock: number;
};

type TProductInStock = {
	[key: string]: TDetailsProduct | null;
};

function useProduct(id: string) {
	const [product, setProduct] = useState<TProduct | undefined>(undefined);
	const [productInStock, setProductInStock] = useState<TProductInStock>({});
	const [colorSelected, setColorSelected] = useState<String>('');
	const [sizeSelected, setSizeSelected] = useState<String>('');
	const [productSelected, setProductSelected] = useState<TDetailsProduct | null>(null);
	const [availableSizes, setAvailableSizes] = useState<ISizes[]>([]);

	useEffect(() => {
		getProduct(id).then((product) => {
			setProduct({
				availableColours: product!.products_in_stock.reduce((acc: string[], value) => {
					!acc.includes(value.color) && value.stock && acc.push(value.color);
					return acc;
				}, []),
				category_id: product!.category_id,
				description: product!.description,
				name: product!.name,
				product_id: product!.product_id,
				subcategory_id: product!.subcategory_id,
			});
			setColorSelected(product!.products_in_stock[0].color);
			setSizeSelected(product!.products_in_stock[0].sizes?.name!);
			setProductInStock(
				product!.products_in_stock.reduce((acc: TProductInStock, value: TDetailsProduct) => {
					acc[value?.slug] = value;
					return acc;
				}, {})
			);
		});
	}, []);

	useEffect(() => {
		sizeSelected &&
			setProductSelected(
				productInStock[
					`${product?.name
						.toLocaleLowerCase()
						.replaceAll(' ', '_')}_${sizeSelected.toLowerCase()}_${colorSelected
						.replaceAll(' ', '-')
						.toLocaleLowerCase()}`
				]
			);
	}, [sizeSelected]);

	useEffect(() => {
		setAvailableSizes(
			(prev) =>
				(prev = Object.values(productInStock)
					.reduce((acc: ISizes[], value: any) => {
						!acc.some((el) => el.sizes_id === value.size_id) &&
							value.stock &&
							value.color === colorSelected &&
							acc.push(value.sizes!);
						return acc;
					}, [])
					.sort((a, b) => a.sizes_id - b.sizes_id))
		);
		setSizeSelected((prev) => (prev = availableSizes[0]?.name));
		sizeSelected &&
			setProductSelected(
				productInStock[
					`${product?.name
						.toLocaleLowerCase()
						.replaceAll(' ', '_')}_${sizeSelected.toLowerCase()}_${colorSelected
						.replaceAll(' ', '-')
						.toLocaleLowerCase()}`
				]
			);
	}, [colorSelected]);

	return {
		availableSizes,
		colorSelected,
		product,
		productSelected,
		setColorSelected,
		sizeSelected,
		setSizeSelected,
	};
}
export default useProduct;
