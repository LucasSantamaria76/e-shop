/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect, useState } from 'react';
import { formatPrice } from '@/app/libs';
import Image from 'next/image';
import { colors } from '@/app/libs/colors';
import { redressed } from '@/app/fonts';
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

type Props = { params: { id: string } };

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

const ProductPage = ({ params: { id } }: Props) => {
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

	return (
		<div className='bg-gray-100 py-8 h-screen'>
			<div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex flex-col md:flex-row mx-4'>
					<div className='flex flex-col w-1/2 px-4'>
						<div className='h-[460px] rounded-lg bg-gray-300 mb-4'>
							<Image
								className='object-cover w-full h-full aspect-auto'
								width={400}
								height={400}
								src={
									productSelected?.images[0]
										? productSelected?.images[0]
										: 'https://colegiocei.es/wp-content/uploads/2023/12/producto-sin-imagen.png'
								}
								alt={''}
							/>
						</div>
						<div className='flex -mx-2 mb-4'>
							<div className='w-1/2 px-2'>
								<button className='w-full bg-gray-900 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800'>
									Añadir al carrito
								</button>
							</div>
							<div className='w-1/2 px-2'>
								<button className='w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-full font-bold hover:bg-gray-300'>
									Añadir a la lista de deseos
								</button>
							</div>
						</div>
					</div>
					<div className='flex flex-col gap-5 w-1/2 px-4'>
						<h1 className={`${redressed.className} text-5xl text-gray-800 mb-2 capitalize`}>
							{product?.name.toLocaleLowerCase()}
						</h1>

						<div className='mr-4'>
							<span className='font-bold text-gray-700'>Precio:</span>
							{productSelected && (
								<span className='text-gray-600'> {formatPrice(productSelected?.price!)}</span>
							)}
						</div>
						<div>
							<span className='font-bold text-gray-700'>Disponibilidad: </span>
							{productSelected && (
								<span className='text-gray-600'>{`${productSelected?.stock} unidad${
									productSelected?.stock === 1 ? '' : 'es'
								} en stock`}</span>
							)}
						</div>
						<div className='mb-4'>
							<span className='font-bold text-gray-700'>Seleccionar el color:</span>
							<div className='flex items-center gap-1 mt-2'>
								{product?.availableColours?.map((color) => (
									<div
										className={`rounded-lg w-8 h-8 ${colors[color]} cursor-pointer ${
											colorSelected === color ? 'ring-2 ring-red-500' : ''
										}`}
										key={color}
										onClick={() => setColorSelected(color)}
									/>
								))}
							</div>
						</div>
						<div className='mb-4'>
							<span className='font-bold text-gray-700'>Seleccionar talle:</span>
							<div className='flex items-center mt-2'>
								{availableSizes?.map((size) => (
									<button
										className={`bg-gray-300 text-gray-700 mr-2 py-1 px-4 rounded-md font-bold border border-gray-500 hover:bg-gray-500 ${
											sizeSelected === size.name && 'bg-gray-500'
										}`}
										onClick={() => setSizeSelected(size.name)}
										key={size.sizes_id}>
										{size.name}
									</button>
								))}
							</div>
						</div>
						<div>
							<span className='font-bold text-gray-700'>Descripción del Producto:</span>
							<p className='text-gray-600 text-sm mt-2'>{product?.description}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductPage;
