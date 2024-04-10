'use client'

import { useModalStore, MODAL_CART } from '@/app/store/modalStore'
import { IProductCart, useShopStore } from '@/app/store/shopStore'
import { Button, Modal } from 'flowbite-react'
import { ModalCartItem } from '../..'
import { formatPrice } from '@/app/libs'
import { modalTheme } from '@/app/theme'
import { FaRegTrashCan } from 'react-icons/fa6'
import { useEffect } from 'react'

const CartDialog = () => {
	const onClose = useModalStore.use.onClose()
	const isOpen = useModalStore.use[MODAL_CART]()
	const productsInCart = useShopStore.use.cart()
	const resetCart = useShopStore.use.resetCart()
	const totalItems = useShopStore.use.totalItems()

	useEffect(() => {
		!totalItems &&
			setTimeout(() => {
				onClose(MODAL_CART)
			}, 1000)
	}, [onClose, totalItems])

	return (
		<Modal
			dismissible
			show={isOpen}
			size='xl'
			theme={modalTheme}
			position='top-right'
			onClose={() => onClose(MODAL_CART)}
			className='z-50'>
			<Modal.Body className='overflow-hidden'>
				{Object.keys(productsInCart).length ? (
					<nav className='text-[10px] border-b border-gray-500 mb-2 flex items-center justify-between'>
						<span className=' w-[40%] text-center'>Nombre/color/talle</span>
						<span className=' w-[20%] text-center'>cantidad/precio</span>
						<span className=' w-[40%] text-end pr-8'>subTotal</span>
					</nav>
				) : null}
				<div className=' max-h-[400px] overflow-y-auto mb-4'>
					{Object.keys(productsInCart).length ? (
						Object.keys(productsInCart).map((productKey) => (
							<ModalCartItem key={productKey} {...productsInCart[productKey]} />
						))
					) : (
						<h3 className='text-lg text-red-700 font-bold text-center mb-5'>
							No hay productos en el carrito
						</h3>
					)}
				</div>
			</Modal.Body>
			{Object.keys(productsInCart).length ? (
				<Modal.Footer className='py-2 px-4 flex items-center justify-between'>
					<div className='flex flex-col'>
						<p className='text-xs'>Cantidad de items</p>
						<p className='text-xs'>
							en el carrito<span className='font-bold text-red-400 text-sm ml-2'>{totalItems}</span>
						</p>
					</div>
					<Button gradientMonochrome='failure' onClick={resetCart}>
						<FaRegTrashCan className='mr-2 h-4 w-4' />
						Vaciar carrito
					</Button>
					<div className='flex flex-col items-end gap-1 mb-4 font-bold'>
						<span>Total de la compra</span>
						<span className='text-red-500'>
							{formatPrice(
								Object.values(productsInCart).reduce(
									(sum: number, value: IProductCart) => sum + value.price * value.quantity,
									0
								)
							)}
						</span>
					</div>
				</Modal.Footer>
			) : null}
			<Modal.Footer className='p-4'>
				<button
					className='flex-1 bg-blue-900 text-white text-sm py-2 px-4 rounded-md shadow shadow-black active:shadow-none hover:bg-gray-700'
					onClick={() => onClose(MODAL_CART)}>
					Seguir comprando
				</button>
				{Object.keys(productsInCart).length ? (
					<button className='flex-1 bg-cyan-600/20 text-sm text-gray-800 py-2 px-4 rounded-md shadow shadow-black active:shadow-none hover:bg-cyan-300/30'>
						Finalizar compra
					</button>
				) : null}
			</Modal.Footer>
		</Modal>
	)
}
export default CartDialog
