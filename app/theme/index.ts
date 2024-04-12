import { CustomFlowbiteTheme } from 'flowbite-react';

export const modalTheme: CustomFlowbiteTheme['modal'] = {
	root: {
		base: 'fixed inset-x-0 top-0 z-50 h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full',
		show: {
			on: 'flex bg-gray-900 bg-opacity-50 dark:bg-opacity-80 pt-14',
			off: 'hidden',
		},
		sizes: {
			sm: 'max-w-sm',
			md: 'max-w-md',
			lg: 'max-w-lg',
			xl: 'max-w-xl',
			'2xl': 'max-w-2xl',
			'3xl': 'max-w-3xl',
			'4xl': 'max-w-4xl',
			'5xl': 'max-w-5xl',
			'6xl': 'max-w-6xl',
			'7xl': 'max-w-7xl',
		},
		positions: {
			'top-left': 'items-start justify-start',
			'top-center': 'items-start justify-center',
			'top-right': 'items-start justify-end sm:pr-4',
			'center-left': 'items-center justify-start',
			center: 'items-center justify-center',
			'center-right': 'items-center justify-end',
			'bottom-right': 'items-end justify-end',
			'bottom-center': 'items-end justify-center',
			'bottom-left': 'items-end justify-start',
		},
	},
	content: {
		base: 'relative h-full w-full md:h-auto',
		inner:
			'relative flex max-h-[90dvh] w-full flex-col rounded-lg bg-white shadow shadow-black dark:bg-gray-700',
	},
	body: {
		base: 'flex-1 overflow-auto p-6',
		popup: 'pt-0',
	},
	header: {
		base: 'flex items-start justify-between rounded-t border-b p-5 dark:border-gray-600',
		popup: 'border-b-0 p-2',
		title: 'text-xl font-medium text-gray-900 dark:text-white',
		close: {
			base: 'ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white',
			icon: 'h-5 w-5',
		},
	},
	footer: {
		base: 'flex items-center space-x-2 rounded-b border-gray-300 p-6 dark:border-gray-600',
		popup: 'border-t',
	},
}

export const dropdownTheme: CustomFlowbiteTheme['dropdown'] = {
	arrowIcon: 'ml-2 h-4 w-4',
	content: 'py-1 focus:outline-none',
	floating: {
		animation: 'transition-opacity',
		arrow: {
			base: 'absolute z-10 h-2 w-2 rotate-45',
			style: {
				dark: 'bg-gray-900 dark:bg-gray-700',
				light: 'bg-white',
				auto: 'bg-white dark:bg-gray-700',
			},
			placement: '-4px',
		},
		base: 'z-50 w-fit divide-y divide-gray-100 rounded shadow-md shadow-black/30 focus:outline-none',
		content: 'py-1 text-sm text-gray-700 dark:text-gray-200',
		divider: 'my-1 h-px bg-gray-100 dark:bg-gray-600',
		header: 'block px-4 py-2 text-sm text-gray-700 dark:text-gray-200',
		hidden: 'invisible opacity-0',
		item: {
			container: '',
			base: 'flex w-full cursor-pointer items-center justify-start px-4 py-2 text-sm text-gray-700 rounded hover:border border-gray-300 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:bg-gray-600 dark:focus:text-white',
			icon: 'mr-2 h-4 w-4',
		},
		style: {
			dark: 'bg-gray-900 text-white dark:bg-gray-700',
			light: 'border border-gray-200 bg-white text-gray-900',
			auto: 'border border-gray-200 bg-white text-gray-900 dark:border-none dark:bg-gray-700 dark:text-white',
		},
		target: 'w-fit',
	},
	inlineWrapper: 'flex items-center',
}