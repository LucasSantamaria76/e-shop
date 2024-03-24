import Image from 'next/image';
import { IProduct } from '../interfaces/products';
import Link from 'next/link';
import { formatPrice } from '../libs';

/* 

src={
							images?.length
								? images[0]
								: 'https://images.pexels.com/photos/61180/pexels-photo-61180.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
						}
*/
const CardProduct = ({ name, slug, images, products_in_stock }: IProduct) => {
  return (
    <div className='rounded-lg bg-white overflow-hidden mx-auto max-w-xs md:max-w-60 shadow-md shadow-black/30'>
      <Link href='#' />
      <div className='relative'>
        <Link href='#'>
          <Image
            className='object-contain'
            width={300}
            height={400}
            src={
              images?.length
                ? images[0]
                : 'https://images.pexels.com/photos/61180/pexels-photo-61180.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
            }
            alt={''}
          />
          <div className='bg-transparent transition duration-500 absolute bottom-0 top-0 right-0 left-0 hover:bg-gray-900 opacity-25'></div>
        </Link>
        <Link href='!#'>
          <div className='text-sm absolute top-0 right-0 bg-indigo-600 px-4 text-white rounded-full h-16 w-16 flex flex-col items-center justify-center mt-3 mr-3 hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out'>
            <span className='font-bold'>27</span>
            <small>March</small>
          </div>
        </Link>
      </div>
      <div className='px-6 py-4 bg-gray-100'>
        <p className=''>{name}</p>
        <p className='text-xs'>{formatPrice(products_in_stock[0]?.price || 0)}</p>
      </div>
    </div>
  );
};
export default CardProduct;
