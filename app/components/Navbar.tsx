import Link from 'next/link';
import { Container } from '.';
import { redressed } from '../fonts';

type NavbarProps = {};

export const Navbar = (props: NavbarProps) => {
	return (
		<div className='sticky top-0 w-full z-30 shadow-md border-b py-2'>
			<Container>
				<div className='flex items-center justify-between gap-3 md:gap-0'>
					<Link href='/' className={`${redressed.className} text-2xl font-bold`}>
						E-Shop
					</Link>
					<div className='hidden md:block'>Search</div>
					<div className='flex items-center gap-8 md:gap-12'>
						<div className=''>Cart</div>
						<div className=''>User</div>
					</div>
				</div>
			</Container>
		</div>
	);
};
