import { CardProduct } from './components';
import { IProduct, IProductInStockDB } from './interfaces/products';
import CreateSupabaseServerClient from './supabase/server';

const getProducts = async (): Promise<IProduct[] | any> => {
	try {
		const supabase = await CreateSupabaseServerClient();

		const { data, error } = await supabase
			.from('products_in_stock')
			.select('*,products(name,slug,description,subcategory_id),colors(name)');
		const { data: colors } = await supabase.from('colors').select('*');

		const { data: sizes } = await supabase.from('sizes').select('sizes_id, name');

		if (error) throw new Error(error.message);

		const products = data.map(
			({ product_id, stock, price, images, products, color_id, size_id }: IProductInStockDB) => ({
				productId: product_id,
				name: products.name,
				slug: products.slug,
				stock,
				price,
				description: products.description,
				subcategoryId: products?.subcategory_id,
				color: colors?.find((el) => el.color_id === color_id)?.name,
				size: sizes?.find((el) => el.sizes_id === size_id)?.name,
				images,
			})
		);

		return products;
	} catch (error) {
		console.log(error);
		return error;
	}
};

export default async function Home() {
	const products = await getProducts();

	return (
		<div className='flex flex-wrap w-11/12 mx-auto gap-2 mt-8'>
			{products &&
				products.map((product: IProduct) => <CardProduct key={product.productId} {...product} />)}
		</div>
	);
}
