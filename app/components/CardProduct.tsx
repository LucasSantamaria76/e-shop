import Image from 'next/image';
import Link from 'next/link';
import { poppins, redressed } from '../fonts';
import { colors } from '../libs/colors';
import { IProduct } from '../types';

type CardProductProps = IProduct;

const CardProduct = (product: CardProductProps) => {
	return (
		<div className='flex flex-col justify-between rounded-lg bg-white overflow-hidden mx-auto w-[400px] shadow-md shadow-black/30 border border-black/30'>
			<Link href='#' />
			<div className='relative'>
				<Link href={`/producto/${product.productId}`}>
					<Image
						className='object-contain w-[400px] h-[400px]'
						width={400}
						height={400}
						src={
							product?.images[0]
								? product?.images[0]
								: 'https://colegiocei.es/wp-content/uploads/2023/12/producto-sin-imagen.png'
						}
						alt={''}
					/>
					<div className='bg-transparent transition duration-500 absolute bottom-0 top-0 right-0 left-0 hover:bg-gray-900 opacity-25'></div>
				</Link>
			</div>
			<div className={`${poppins.className} px-6 py-4 bg-gray-100`}>
				<p
					className={`${redressed.className} capitalize text-2xl font-bold`}>{`${product?.name.toLocaleLowerCase()}`}</p>
				<div className='flex items-center gap-1 mt-2'>
					<p className='text-xs mr-2'>Colores disponibles</p>
					{product.availableColours.map((color) => (
						<div className={`rounded-full w-3 h-3 ${colors[color]}`} key={color} />
					))}
				</div>
				<div
					className='flex items-center gap-1
				\\ mt-2'>
					<p className='text-[10px] mr-2'>Talles disponibles</p>
					{product.availableSizes.map((size) => (
						<div className={`text-[8px] rounded-sm border border-black px-2`} key={size.sizes_id}>
							{size.name}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
export default CardProduct;
