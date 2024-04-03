'use client';

import { useModalStore, MODAL_CART } from '@/app/store/modalStore';
import { IProductCart, useShopStore } from '@/app/store/shopStore';
import { Button, Dialog, DialogPanel } from '@tremor/react';
import { ModalCartItem } from '..';
import { formatPrice } from '@/app/libs';

const CartDialog = () => {
	const onClose = useModalStore.use.onClose();
	const isOpen = useModalStore.use[MODAL_CART]();
	const productsInCart = useShopStore.use.cart();

	return (
		<Dialog
			open={isOpen}
			onClose={() => onClose(MODAL_CART)}
			static={true}
			className='relative z-[100]'>
			<DialogPanel className='absolute top-14 md:right-10 max-w-lg mx-auto md:mx-0 shadow-md shadow-black'>
				<nav className='text-[10px] border-b border-gray-500 mb-5 flex items-center justify-between'>
					<span>Nombre/color/talle</span>
					<span>cantidad/precio</span>
					<span>subTotal</span>
				</nav>
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
				{Object.keys(productsInCart).length ? (
					<div className='flex items-center justify-end gap-4 mb-4 font-bold  border-t-2 border-gray-300 pt-2'>
						<span>Total de la compra:</span>
						<span className='text-red-500'>
							{formatPrice(
								Object.values(productsInCart).reduce(
									(sum: number, value: IProductCart) => sum + value.price * value.quantity,
									0
								)
							)}
						</span>
					</div>
				) : null}
				<button
					className='w-full bg-blue-900 text-white text-sm mb-2 py-2 px-4 rounded-md shadow shadow-black active:shadow-none hover:bg-gray-700 disabled:bg-gray-200 disabled:hover:bg-none disabled:cursor-not-allowed'
					onClick={() => onClose(MODAL_CART)}>
					Seguir comprando
				</button>
				{Object.keys(productsInCart).length ? (
					<button className='w-full bg-cyan-600/20 text-sm text-gray-800 py-2 px-4 rounded-md shadow shadow-black active:shadow-none hover:bg-cyan-300/30'>
						Finalizar compra
					</button>
				) : null}
			</DialogPanel>
		</Dialog>
	);
};
export default CartDialog;
