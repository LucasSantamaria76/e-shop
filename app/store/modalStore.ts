import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { createSelectors } from './createSelectors';

export const MODAL_CART = 1;

type State = {
	[MODAL_CART]: boolean;
};

type Actions = {
	onClose: (modal: number) => void;
	onShow: (modal: number) => void;
};

const initialState = {
	[MODAL_CART]: false,
};

const useModalStoreBase = create<State & Actions>()(
	devtools((set) => ({
		...initialState,
		onClose: (modal: number) => set(() => ({ [modal]: false })),
		onShow: (modal: number) => set(() => ({ [modal]: true })),
	}))
);
export const useModalStore = createSelectors(useModalStoreBase);
