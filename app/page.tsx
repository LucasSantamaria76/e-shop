import { CardProduct } from './components';
import CreateSupabaseServerClient from './supabase/server';
import { QueryData } from '@supabase/supabase-js';
import { ISizes } from './types';

const getProducts = async () => {
	try {
		const supabase = await CreateSupabaseServerClient();
		const productsWithInStockQuery = supabase
			.from('products')
			.select('*,products_in_stock(*),sizes(name,sizes_id)');

		type TProductsWithInStock = QueryData<typeof productsWithInStockQuery>;

		const { data, error } = await productsWithInStockQuery;

		if (error) throw error;
		const productsWithInStock: TProductsWithInStock = data;

		return productsWithInStock?.map((product) => ({
			productId: product.product_id,
			name: product.name,
			description: product.description,
			categoryId: product.category_id,
			subcategoryId: product.subcategory_id,
			images: product.products_in_stock.reduce(
				(acc: string[], value) => [...acc, ...value.images],
				[]
			),
			availableColours: product.products_in_stock.reduce((acc: string[], value) => {
				!acc.includes(value.color) && acc.push(value.color);
				return acc;
			}, []),

			availableSizes: product.sizes
				.reduce((acc: ISizes[], value) => {
					!acc.filter((el) => el.sizes_id === value.sizes_id).length && acc.push(value);
					return acc;
				}, [])
				.sort((a, b) => a.sizes_id - b.sizes_id),
		}));
	} catch (error) {
		console.log(error);
	}
};

export default async function Home() {
	const products = await getProducts();

	return (
		<div className='flex flex-wrap w-11/12 mx-auto gap-2 mt-8'>
			{products?.map((product) => (
				<CardProduct
					productId={product.productId}
					name={product.name}
					description={product.description}
					categoryId={product.categoryId}
					subcategoryId={product.subcategoryId}
					images={product.images}
					availableColours={product.availableColours}
					availableSizes={product.availableSizes}
					key={product.productId}
				/>
			))}
		</div>
	);
}
