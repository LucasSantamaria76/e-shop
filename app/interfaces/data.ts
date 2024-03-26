export interface IData {
	sizes: ISizes;
	colors: IColors;
	categories: ICategories;
}

export interface IColors {
	[key: string]: string;
}
export interface ICategories {
	[key: number]: string;
}

export interface ISizes {
	[key: number]: { name: string; equivalence: string; category_id: number }[];
}
