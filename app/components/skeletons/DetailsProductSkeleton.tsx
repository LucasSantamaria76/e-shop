const DetailsProductSkeleton = () => {
	return (
		<div className='relative bg-gray-100 py-8 h-screen animate-pulse'>
			<div className='absolute top-2 left-2 h-10 w-10 bg-gray-200 rounded' />
			<div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex flex-col md:flex-row mx-4'>
					<div className='flex flex-col w-1/2 px-4'>
						<div className='object-contain w-[400px] h-[400px] mb-1 rounded-md bg-gray-200' />
						<div className='h-20 bg-gray-200 rounded-md mb-4' />
						<div className='flex -mx-2 mb-4'>
							<div className='w-1/2 px-2'>
								<div className='w-full h-10 bg-gray-200 rounded-full' />
							</div>
							<div className='w-1/2 px-2'>
								<div className='w-full h-10 bg-gray-200 rounded-full' />
							</div>
						</div>
					</div>
					<div className='flex flex-col gap-5 w-1/2 px-4'>
						<div className='h-10 bg-gray-200 rounded w-1/2 mb-2' />
						<div className='mr-4 h-10 bg-gray-200 rounded w-full' />
						<div className='h-10 bg-gray-200 rounded w-full mb-4' />
						<div className='h-24 bg-gray-200 rounded mb-4' />
						<div className='h-24 bg-gray-200 rounded mb-4' />
						<div className='h-14 bg-gray-200 rounded mb-2' />
					</div>
				</div>
			</div>
		</div>
	);
};
export default DetailsProductSkeleton;
