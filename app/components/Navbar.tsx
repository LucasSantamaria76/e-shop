'use client';

import Link from 'next/link';
import { Container } from '.';
import { redressed } from '../fonts';
import { RiAccountCircleLine, RiSearchLine, RiShoppingCart2Line } from '@remixicon/react';
import { Icon, TextInput } from '@tremor/react';

type NavbarProps = {};

export const Navbar = (props: NavbarProps) => {
	return (
		<div className='sticky top-0 w-full z-30 bg-gray-50 shadow-md border-b py-2'>
			<Container>
				<div className='flex items-center justify-between gap-3 md:gap-0'>
					<Link href='/' className={`${redressed.className} text-2xl font-bold`}>
						E-Shop
					</Link>

					<TextInput
						icon={RiSearchLine}
						placeholder='Buscar Producto...'
						className='hidden md:flex w-1/2'
					/>

					<div className='flex items-center gap-8 md:gap-12'>
						<Icon
							icon={RiShoppingCart2Line}
							variant='shadow'
							tooltip='Mi carrito'
							size='md'
							className='cursor-pointer'
						/>
						<Icon
							icon={RiAccountCircleLine}
							variant='shadow'
							tooltip='Iniciar sesión'
							size='md'
							className='cursor-pointer'
						/>
					</div>
				</div>
			</Container>
		</div>
	);
};
