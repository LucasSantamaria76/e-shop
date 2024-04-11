'use client';

import Link from 'next/link';
import { Container } from '.';
import { redressed } from '../fonts'
import { ProductsInDB, TProductsInDB, useShopStore } from '../store/shopStore'
import { MODAL_CART, MODAL_LOGIN, useModalStore } from '../store/modalStore'
import { CartDialog, LoginDialog, SearchDialog } from './dialogs'
import { Avatar, Badge, Button, Dropdown, TextInput } from 'flowbite-react'
import { useEffect } from 'react'
import Icon from './Icon'
import { supabase } from '../supabase/client'
import { UserResponse } from '@supabase/supabase-js'
import { TUser } from '../types'

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
	const user = useShopStore.use.user()
	const setUser = useShopStore.use.setUser()

	useEffect(() => {
		getProducts().then((products: any) => setProducts(products))
		supabase.auth.onAuthStateChange(async (_, session) => {
			if (session) {
				const { data } = await supabase
					.from('profiles')
					.select('name, address, phone, city, avatar_url, created_at')
					.eq('id', session.user.id)
					.single()
				const user = { ...data, email: session.user.email! } as TUser
				setUser(user)
			} else setUser(null)
		})
	}, [setProducts, setUser])

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
							{user ? (
								<Dropdown
									label={
										<Avatar
											img={user.avatar_url}
											alt='avatar user'
											rounded
											className='border border-gray-500 rounded-full  hover:ring-1 hover:ring-cyan-500'
										/>
									}
									arrowIcon={false}
									inline>
									<Dropdown.Header>
										<span className='block text-sm font-semibold'>{user.name}</span>
										<span className='block truncate text-xs text-gray-400'>{user.email}</span>
									</Dropdown.Header>
									<Dropdown.Item>Editar perfil</Dropdown.Item>
									<Dropdown.Item>Lista de deseos</Dropdown.Item>
									<Dropdown.Divider />
									<Dropdown.Item onClick={async () => await supabase.auth.signOut()}>
										Cerrar sesión
									</Dropdown.Item>
								</Dropdown>
							) : (
								<Icon size={32} name={'CircleUserRound'} onClick={() => onShow(MODAL_LOGIN)} />
							)}
						</div>
					</div>
				</Container>
			</div>
			<CartDialog />
			<LoginDialog />
		</>
	)
}
