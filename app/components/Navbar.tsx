'use client';

import Link from 'next/link';
import { Container } from '.';
import { redressed } from '../fonts';
import { PiShoppingCartThin } from 'react-icons/pi';
import { ProductsInDB, TProductsInDB, useShopStore } from '../store/shopStore';
import { MODAL_CART, MODAL_SEARCH, useModalStore } from '../store/modalStore';
import { CartDialog, SearchDialog } from './dialogs';
import { Badge, Button, TextInput } from 'flowbite-react';
import { CiUser } from 'react-icons/ci';
import { useEffect } from 'react';

const getProducts = async () => {
	try {
		const { data, error } = await ProductsInDB;

		if (error) throw error;
		const products: TProductsInDB = data;

		return products;
	} catch (error) {
		console.error(error);
	}
};

type NavbarProps = {};

export const Navbar = (props: NavbarProps) => {
	const totalItems = useShopStore.use.totalItems();
	const onShow = useModalStore.use.onShow();
	const setProducts = useShopStore.use.setProducts();

	useEffect(() => {
		getProducts().then((products: any) => setProducts(products));
	}, [setProducts]);

	return (
		<>
			<div className='sticky top-0 w-full z-30 bg-gray-50 shadow-md border-b py-2'>
				<Container>
					<div className='flex items-center justify-between gap-3 md:gap-0'>
						<Link href='/' className={`${redressed.className} text-2xl font-bold`}>
							E-Shop
						</Link>

						<SearchDialog />

						<div
							className='relative flex items-center gap-8 md:gap-12 cursor-pointer'
							onClick={() => onShow(MODAL_CART)}>
							<PiShoppingCartThin size={40} />
							{totalItems ? (
								<Badge className='absolute -top-[7px] left-[10px] flex items-start justify-center w-5 h-6 bg-cyan-500/25 border border-black text-[10px] text-black font-extralight z-0'>
									{totalItems}
								</Badge>
							) : null}
							<CiUser size={40} />
						</div>
					</div>
				</Container>
			</div>
			<CartDialog />
		</>
	);
};
