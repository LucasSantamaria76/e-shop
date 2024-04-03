'use client';

import { create } from 'zustand';

import { createSelectors } from './createSelectors';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { ISizes, TDetailsProduct } from '../types';

export interface IProductCart extends TDetailsProduct {
	quantity: number;
}

interface IState {
	cart: Record<string, IProductCart>;
	totalItems: number;
}

interface IActions {
	addToCart: (ItemKey: string, product: TDetailsProduct) => void;
	increaseItemQuantity: (Item: string) => void;
	decreaseItemQuantity: (Item: string) => void;
}

const INITIAL_STATE: IState = {
	cart: {},
	totalItems: 0,
};

const useShopStoreBase = create<IState & IActions>()(
	devtools(
		immer((set) => ({
			...INITIAL_STATE,
			addToCart: (ItemKey: string, product: TDetailsProduct) =>
				set((state) => {
					if (state.cart[ItemKey]) {
						if (state.cart[ItemKey].stock > state.cart[ItemKey].quantity) {
							state.cart[ItemKey].quantity += 1;
							state.totalItems = state.totalItems + 1;
						}
					} else {
						state.cart[ItemKey] = { ...product, quantity: 1 };
						state.totalItems = state.totalItems + 1;
					}
					return state;
				}),
			increaseItemQuantity: (Item: string) =>
				set((state) => {
					if (state.cart[Item].stock > state.cart[Item].quantity) {
						state.cart[Item].quantity += 1;
						state.totalItems = state.totalItems + 1;
					}
					return state;
				}),
			decreaseItemQuantity: (Item: string) =>
				set((state) => {
					if (state.cart[Item].quantity > 1) {
						state.cart[Item].quantity -= 1;
						state.totalItems = state.totalItems - 1;
					} else {
						state.totalItems = state.totalItems - 1;
						delete state.cart[Item];
					}
					return state;
				}),
		}))
	)
);

export const useShopStore = createSelectors(useShopStoreBase);
