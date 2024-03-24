import { CardProduct } from './components';
import { IProduct } from './interfaces/products';
import CreateSupabaseServerClient from './supabase/server';

const getProducts = async () => {
  try {
    const supabase = await CreateSupabaseServerClient();

    const { data, error } = await supabase.from('products').select('*,products_in_stock(*)');

    if (error) throw new Error(error.message);

    return data;
  } catch (error) {
    console.log(error);
  }
};

export default async function Home() {
  const products = await getProducts();

  return (
    <div className='flex flex-wrap w-11/12 mx-auto gap-2 mt-8'>
      {products && products.map((product: IProduct) => <CardProduct key={product.product_id} {...product} />)}
    </div>
  );
}
