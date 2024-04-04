'use client';

/* ***************** */

import { formatPrice } from '@/app/libs';
import Image from 'next/image';
import { colors } from '@/app/libs/colors';
import { redressed } from '@/app/fonts';
import useProduct from '@/app/hooks/useProduct';
import { useShopStore } from '@/app/store/shopStore';
import { Thumbnail } from '@/app/components';
import { useState } from 'react';
import Link from 'next/link';
import { RiArrowLeftLine } from '@remixicon/react';
import { DetailsProductSkeleton } from '@/app/components/skeletons';

type Props = { params: { id: string } };

const ProductPage = ({ params: { id } }: Props) => {
	const addToCart = useShopStore.use.addToCart();
	const {
		availableSizes,
		colorSelected,
		product,
		productSelected,
		setColorSelected,
		sizeSelected,
		setSizeSelected,
	} = useProduct(id);
	const [imageSelected, setImageSelected] = useState(0);

	if (!product?.name) return <DetailsProductSkeleton />;

	return (
		<div className='relative bg-gray-100 py-8 h-screen'>
			<Link
				href={'/'}
				className='absolute top-2 left-2 bg-cyan-600/20 text-sm text-gray-800 py-1 px-1 rounded-md shadow shadow-black active:shadow-none hover:bg-cyan-300/30'>
				<RiArrowLeftLine />
			</Link>
			<div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex flex-col md:flex-row mx-4'>
					<div className='flex flex-col w-1/2 px-4'>
						<Image
							className='object-contain w-[400px] h-[400px] mb-1 rounded-md'
							width={400}
							height={400}
							src={
								productSelected?.images[imageSelected]
									? productSelected?.images[imageSelected]
									: 'https://colegiocei.es/wp-content/uploads/2023/12/producto-sin-imagen.png'
							}
							alt={''}
						/>
						<Thumbnail
							images={productSelected?.images || []}
							imageSelected={imageSelected}
							setImageSelected={setImageSelected}
						/>
						<div className='flex -mx-2 mb-4'>
							<div className='w-1/2 px-2'>
								<button
									disabled={!productSelected}
									onClick={() => addToCart(productSelected?.slug!, productSelected!)}
									className='w-full bg-blue-900 text-white text-sm py-2 px-4 rounded-full shadow shadow-black active:shadow-none hover:bg-gray-700 disabled:bg-gray-200 disabled:hover:bg-none disabled:cursor-not-allowed'>
									Añadir producto al carrito
								</button>
							</div>
							<div className='w-1/2 px-2'>
								<button className='w-full bg-cyan-600/20 text-sm text-gray-800 py-2 px-4 rounded-full shadow shadow-black active:shadow-none hover:bg-cyan-300/30'>
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
							{productSelected ? (
								<span className='text-gray-600'> {formatPrice(productSelected?.price!)}</span>
							) : (
								<span className='text-red-500 ml-2'>No disponible</span>
							)}
						</div>
						<div>
							<span className='font-bold text-gray-700'>Disponibilidad: </span>
							{productSelected ? (
								<span className='text-gray-600'>{`${productSelected?.stock} unidad${
									productSelected?.stock === 1 ? '' : 'es'
								} en stock`}</span>
							) : (
								<span className='text-red-500 ml-2'>Sin stock</span>
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
											sizeSelected === size.name && 'bg-gray-500 text-white'
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
