import Image from 'next/image';

type Props = {
	images: string[];
	imageSelected: number;
	setImageSelected: React.Dispatch<React.SetStateAction<number>>;
};
const Thumbnail = ({ images, imageSelected, setImageSelected }: Props) => {
	return (
		<div className='flex items-center gap-2 w-[400px] h-20 overflow-x-auto mb-2 p-1'>
			{images.map((image, idx) => (
				<div
					className={`relative w-16 h-16 rounded-md border border-gray-300 cursor-pointer overflow-hidden ${
						imageSelected === idx && 'ring-1 ring-red-500'
					}`}
					onClick={() => setImageSelected(idx)}
					key={image}>
					<Image
						className='object-contain w-full h-auto'
						width={0}
						height={0}
						src={image}
						alt={''}
					/>
					<div className='bg-transparent transition duration-500 absolute bottom-0 top-0 right-0 left-0 hover:bg-gray-900 opacity-25'></div>
				</div>
			))}
		</div>
	)
};
export default Thumbnail;
