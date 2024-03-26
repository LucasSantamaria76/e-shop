'use client';

import { ICategories, IColors, IData, IProduct, ISizes, ISubCategories } from '../interfaces';
import { supabase } from '../supabase/client';

export const initialGetData = async <IData>() => {
  const { data: dataSizes } = await supabase.from('sizes').select('*');
  const { data: dataColors } = await supabase.from('colors').select('*');
  const { data: dataCategories } = await supabase.from('categories').select('*');
  const { data: dataSubCategories } = await supabase.from('subcategories').select('*');
  const { data: productsDB } = await supabase
    .from('products')
    .select('*,products_in_stock(size_id,color_id,stock,images,price)');
  console.log(productsDB);

  const sizes: ISizes = dataSizes?.reduce((acc, value) => {
    acc[value.sizes_id] = {
      name: value.name,
      equivalence: value.equivalence,
      category_id: value.category_id,
    };
    return acc;
  }, {});

  const colors: IColors = dataColors?.reduce((acc, value) => {
    acc[value.color_id] = value.name;
    return acc;
  }, {});

  const categories: ICategories = dataCategories?.reduce((acc, value) => {
    acc[value.category_id] = value.name;
    return acc;
  }, {});

  const subCategories: ISubCategories = dataSubCategories?.reduce((acc, value) => {
    acc[value.subcategory_id] = {
      name: value.name,
      categoryId: value.category_id,
    };
    return acc;
  }, {});

  const products: IProduct = productsDB?.reduce((acc, value) => {
    acc[value.product_id] = {
      name: value.name,
      slug: value.slug,
      description: value.description,
      categoryId: value.category_id,
      subcategoryId: value.subcategory_id,
      productsInStock: value.products_in_stock,
    };
    return acc;
  }, {});

  return { sizes, colors, categories, subCategories };
};
