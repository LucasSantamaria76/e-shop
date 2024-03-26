import { create } from 'zustand';
import { ICategories, IColors, IData, ISizes } from '../interfaces';
import { createSelectors } from './createSelectors';
import { devtools } from 'zustand/middleware';

interface IShopStore {
	sizes: ISizes;
	colors: IColors;
	categories: ICategories;
	setData: (data: IData) => void;
}

const useShopStoreBase = create<IShopStore>()(
	devtools((set) => ({
		sizes: {},
		colors: {},
		categories: {},
		setData: (data: IData) => set({ ...data }),
	}))
);

export const useShopStore = createSelectors(useShopStoreBase);
