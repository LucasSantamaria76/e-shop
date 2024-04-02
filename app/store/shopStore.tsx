import { create } from 'zustand';
import {
	ICategories,
	IColors,
	IData,
	IProduct,
	IProductStore,
	ISizes,
	ISubCategories,
} from '../interfaces';
import { createSelectors } from './createSelectors';
import { devtools } from 'zustand/middleware';

interface IShopStore {
	sizes: ISizes;
	categories: ICategories;
	subCategories: ISubCategories;
	products: IProductStore;
	setData: (data: IData) => void;
	getProduct: (slug: string) => IProduct;
}

const useShopStoreBase = create<IShopStore>()(
	devtools((set, get) => ({
		sizes: {},
		categories: {},
		subCategories: {},
		products: {},
		setData: (data: IData) => set({ ...data }),
		getProduct: (slug: string) => {
			const product = get().products;
			return product[slug];
		},
	}))
);

export const useShopStore = createSelectors(useShopStoreBase);
