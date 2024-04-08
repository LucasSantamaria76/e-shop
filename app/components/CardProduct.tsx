import Link from 'next/link';
import { poppins, redressed } from '../fonts';
import { colors } from '../libs/colors';
import { IProduct } from '../types';
import { Card } from 'flowbite-react';
import Image from 'next/image';

type CardProductProps = IProduct;

const CardProduct = (product: CardProductProps) => {
	return (
		<Card
			className='max-w-sm overflow-hidden'
			renderImage={() => (
				<Link href={`/producto/${product.productId}`} className='relative'>
					<Image
						className='object-contain w-[500px] h-[500px]'
						width={500}
						height={500}
						src={
							product?.images[0]
								? product?.images[0]
								: 'https://colegiocei.es/wp-content/uploads/2023/12/producto-sin-imagen.png'
						}
						alt={`foto ${product?.name.toLocaleLowerCase()}`}
					/>
					<div className='bg-transparent transition duration-500 absolute bottom-0 top-0 right-0 left-0 hover:bg-gray-900 opacity-25'></div>
				</Link>
			)}>
			<div className={`${poppins.className} flex flex-col justify-end flex-1`}>
				<h2 className={`${redressed.className} capitalize text-4xl tracking-tight mb-5`}>
					{`${product?.name.toLocaleLowerCase()}`}
				</h2>
				<div className='flex items-center gap-1 mt-2'>
					<p className='text-xs mr-2'>Colores disponibles</p>
					{product.availableColours.map((color) => (
						<div className={`rounded-full w-3 h-3 ${colors[color]}`} key={color} />
					))}
				</div>
				<div className='flex items-center gap-1 mt-2'>
					<p className='text-[10px] mr-2'>Talles disponibles</p>
					{product.availableSizes.map((size) => (
						<div className={`text-[8px] rounded-sm border border-black px-2`} key={size.sizes_id}>
							{size.name}
						</div>
					))}
				</div>
			</div>
		</Card>
	);
};

export default CardProduct;
