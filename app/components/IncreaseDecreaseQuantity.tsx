'use client'
import { useShopStore } from '../store/shopStore'

type Props = {
	Item: string
}
const IncreaseDecreaseQuantity = ({ Item }: Props) => {
	const quantity = useShopStore.use.cart()[Item].quantity
	const stock = useShopStore.use.cart()[Item].stock
	const increaseItemQuantity = useShopStore.use.increaseItemQuantity()
	const decreaseItemQuantity = useShopStore.use.decreaseItemQuantity()

	return (
		<div className='flex items-center gap-2'>
			<p className='text-gray-700 text-lg font-bold px-2 border border-black'>{quantity}</p>
			<button
				className='bg-gray-300 text-gray-700 text-lg px-2 rounded-md font-bold border border-gray-500 hover:bg-blue-200'
				onClick={() => decreaseItemQuantity(Item)}>
				-
			</button>
			<button
				disabled={quantity >= stock}
				className='bg-gray-300 text-gray-700 text-lg px-2 rounded-md font-bold border border-gray-500 hover:bg-blue-200 disabled:cursor-not-allowed disabled:text-gray-400 disabled:bg-gray-100'
				onClick={() => increaseItemQuantity(Item)}>
				+
			</button>
		</div>
	)
}
export default IncreaseDecreaseQuantity
