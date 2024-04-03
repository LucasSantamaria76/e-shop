import { formatPrice } from '@/app/libs';
import { ISizes } from '../../types';
import Image from 'next/image';
import { IncreaseDecreaseQuantity } from '..';

interface Props {
	color: string;
	images: string[];
	price: number;
	product_id: string;
	size_id: number;
	sizes: ISizes;
	slug: string;
	stock: number;
	quantity: number;
}
function ModalCartItem({ color, images, price, sizes, slug, quantity, stock }: Props) {
	return (
		<div className='flex items-center justify-between text-xs mb-1 border border-gray-300 rounded-md px-1 w-[98%]'>
			<div className='flex items-center gap-2 my-1'>
				<Image
					src={
						images[0]
							? images[0]
							: 'https://colegiocei.es/wp-content/uploads/2023/12/producto-sin-imagen.png'
					}
					width={60}
					height={60}
					alt='Imagen del producto'
					className='border border-gray-300 rounded-md'
				/>
				<div className='flex flex-col gap-1'>
					<p className='text-center capitalize'>{slug.split('_')[0].replaceAll('-', ' ')}</p>
					<p className='capitalize'>{color}</p>
					<p className='text-center border border-blue-300 rounded-md'>{sizes.name}</p>
				</div>
			</div>
			<div className='flex flex-col items-center justify-center gap-1'>
				<IncreaseDecreaseQuantity Item={slug} />
				<p className='font-bold'>{formatPrice(price)}</p>
			</div>
			<div>
				<p>Stock: {stock}</p>
				<p className='font-bold text-lg text-red-400'>{formatPrice(price * quantity)}</p>
			</div>
		</div>
	);
}
export default ModalCartItem;
