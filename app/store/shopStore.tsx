'use client';

import { create } from 'zustand';

import { createSelectors } from './createSelectors';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { ISizes, TDetailsProduct, TProductInStore } from '../types';
import { supabase } from '../supabase/client';
import { QueryData } from '@supabase/supabase-js';

export const ProductsInDB = supabase
	.from('products')
	.select(
		'*,categories(name),subcategories(name),products_in_stock(images,color,sizes(name,sizes_id))'
	);

export type TProductsInDB = QueryData<typeof ProductsInDB>;

export interface IProductCart extends TDetailsProduct {
	quantity: number;
}

interface IState {
	products: TProductInStore[];
	cart: Record<string, IProductCart>;
	totalItems: number;
}

interface IActions {
	addToCart: (ItemKey: string, product: TDetailsProduct) => void
	removeFromCart: (ItemKey: string) => void
	resetCart: () => void
	increaseItemQuantity: (ItemKey: string) => void
	decreaseItemQuantity: (ItemKey: string) => void
	setProducts: (products: TProductsInDB) => void
}

const INITIAL_STATE: IState = {
	products: [],
	cart: {},
	totalItems: 0,
}

const useShopStoreBase = create<IState & IActions>()(
	devtools(
		immer((set) => ({
			...INITIAL_STATE,
			addToCart: (ItemKey: string, product: TDetailsProduct) =>
				set((state) => {
					if (state.cart[ItemKey]) {
						if (state.cart[ItemKey].stock > state.cart[ItemKey].quantity) {
							state.cart[ItemKey].quantity += 1
							state.totalItems = state.totalItems + 1
						}
					} else {
						state.cart[ItemKey] = { ...product, quantity: 1 }
						state.totalItems = state.totalItems + 1
					}
					return state
				}),
			removeFromCart: (ItemKey: string) =>
				set((state) => {
					state.totalItems = state.totalItems - state.cart[ItemKey].quantity
					delete state.cart[ItemKey]
					return state
				}),
			resetCart: () => set({ cart: {}, totalItems: 0 }),
			increaseItemQuantity: (ItemKey: string) =>
				set((state) => {
					if (state.cart[ItemKey].stock > state.cart[ItemKey].quantity) {
						state.cart[ItemKey].quantity += 1
						state.totalItems = state.totalItems + 1
					}
					return state
				}),
			decreaseItemQuantity: (ItemKey: string) =>
				set((state) => {
					if (state.cart[ItemKey].quantity > 1) {
						state.cart[ItemKey].quantity -= 1
						state.totalItems = state.totalItems - 1
					} else {
						state.totalItems = state.totalItems - 1
						delete state.cart[ItemKey]
					}
					return state
				}),
			setProducts: (products: TProductsInDB) =>
				set({
					//@ts-ignore
					products: products?.map(
						({ product_id, name, description, categories, subcategories, products_in_stock }) => ({
							category: categories?.name,
							description,
							image:
								products_in_stock[0]?.images[0] ||
								'https://colegiocei.es/wp-content/uploads/2023/12/producto-sin-imagen.png',
							name,
							productID: product_id,
							subCategory: subcategories?.name,
							availableSizes: products_in_stock
								.reduce((acc: ISizes[], value) => {
									!acc.filter((el) => el.sizes_id === value.sizes?.sizes_id).length &&
										acc.push(value.sizes!)
									return acc
								}, [])
								.sort((a: ISizes, b: ISizes) => a.sizes_id - b.sizes_id),
							availableColours: products_in_stock.reduce((acc: string[], value) => {
								!acc.includes(value.color) && acc.push(value.color)
								return acc
							}, []),
						})
					),
				}),
		}))
	)
)

export const useShopStore = createSelectors(useShopStoreBase);
