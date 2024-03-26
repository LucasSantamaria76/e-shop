import { IProductInStockDB } from '.';

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

export interface ISubCategories {
  [key: number]: { name: string; categoryId: number };
}

export interface ISizes {
  [key: number]: { name: string; equivalence: string; category_id: number }[];
}

export interface IProduct {
  [key: string]: {
    name: string;
    slug: string;
    description: string;
    categoryId: number;
    subcategoryId: number;
    productsInStock: IProductInStockDB[];
  };
}
