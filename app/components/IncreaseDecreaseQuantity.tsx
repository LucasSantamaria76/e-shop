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
		<div className='flex items-center'>
			<p className='flex items-center justify-center text-gray-700 text-xl font-bold h-10 w-12 border border-black rounded-l-md'>
				{quantity}
			</p>
			<div className=' flex flex-col'>
				<button
					disabled={quantity >= stock}
					className='flex items-center justify-center h-5 w-5 text-cyan-700 text-lg rounded-tr-md font-bold border-t border-r border-b border-black disabled:cursor-not-allowed disabled:text-gray-400 disabled:bg-gray-100'
					onClick={() => increaseItemQuantity(Item)}>
					▴
				</button>
				<button
					className='flex items-center justify-center h-5 w-5 text-cyan-700 text-lg rounded-br-md font-bold border-r border-b border-black'
					onClick={() => decreaseItemQuantity(Item)}>
					▾
				</button>
			</div>
		</div>
	)
}
export default IncreaseDecreaseQuantity
