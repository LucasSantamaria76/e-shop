'use client';

/* ***************** */


import Link from 'next/link';
import { Container } from '.';
import { redressed } from '../fonts';
import { RiAccountCircleLine, RiSearchLine, RiShoppingCart2Line } from '@remixicon/react';
import { Badge, Icon, TextInput } from '@tremor/react';
import { useShopStore } from '../store/shopStore';
import { MODAL_CART, useModalStore } from '../store/modalStore';
import { CartDialog } from './dialogs';

type NavbarProps = {};

export const Navbar = (props: NavbarProps) => {
	const totalItems = useShopStore.use.totalItems();
	const onShow = useModalStore.use.onShow();

	return (
		<>
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

						<div className='relative flex items-center gap-8 md:gap-12'>
							<Badge className='absolute -top-[6px] left-7' size='xs' color='red'>
								{totalItems}
							</Badge>

							<Icon
								icon={RiShoppingCart2Line}
								variant='shadow'
								tooltip='Mi carrito'
								size='md'
								className='cursor-pointer'
								onClick={() => onShow(MODAL_CART)}
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
			<CartDialog />
		</>
	);
};
