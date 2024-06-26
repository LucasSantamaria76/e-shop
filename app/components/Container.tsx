interface ContainerProps {
	children: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({ children }) => {
	return <div className='max-w-[1920px] mx-auto px-4 md:px-2 xl:px-20'>{children}</div>;
};
