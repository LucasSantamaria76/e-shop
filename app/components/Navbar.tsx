'use client';

import Link from 'next/link';
import { Container } from '.';
import { redressed } from '../fonts'
import { ProductsInDB, TProductsInDB, useShopStore } from '../store/shopStore'
import { MODAL_CART, MODAL_LOGIN, useModalStore } from '../store/modalStore'
import { CartDialog, LoginDialog, SearchDialog } from './dialogs'
import { Badge, Button, TextInput } from 'flowbite-react'
import { useEffect } from 'react'
import Icon from './Icon'

const getProducts = async () => {
	try {
		const { data, error } = await ProductsInDB

		if (error) throw error
		const products: TProductsInDB = data

		return products
	} catch (error) {
		console.error(error)
	}
}

type NavbarProps = {}

export const Navbar = (props: NavbarProps) => {
	const totalItems = useShopStore.use.totalItems()
	const onShow = useModalStore.use.onShow()
	const setProducts = useShopStore.use.setProducts()

	useEffect(() => {
		getProducts().then((products: any) => setProducts(products))
	}, [setProducts])

	return (
		<>
			<div className='sticky top-0 w-full z-30 bg-gray-50 shadow-md border-b py-2'>
				<Container>
					<div className='flex items-center justify-between gap-3 md:gap-0'>
						<Link href='/' className={`${redressed.className} text-2xl font-bold`}>
							E-Shop
						</Link>

						<SearchDialog />

						<div className='flex items-center gap-8 md:gap-12 cursor-pointer'>
							<div className='relative' onClick={() => onShow(MODAL_CART)}>
								<Icon size={32} name={'ShoppingCart'} />
								{totalItems ? (
									<Badge className='absolute -top-1 left-2 rounded-full flex items-start justify-center w-5 h-5 bg-cyan-500/80 border border-black text-[10px] text-white font-extralight z-0'>
										{totalItems}
									</Badge>
								) : null}
							</div>
							<Icon size={32} name={'CircleUserRound'} onClick={() => onShow(MODAL_LOGIN)} />
						</div>
					</div>
				</Container>
			</div>
			<CartDialog />
			<LoginDialog />
		</>
	)
}
