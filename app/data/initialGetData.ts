'use client';

import { ICategories, IColors, IData, ISizes } from '../interfaces';
import { supabase } from '../supabase/client';

export const initialGetData = async <IData>() => {
	const { data: dataSizes } = await supabase.from('sizes').select('*');
	const { data: dataColors } = await supabase.from('colors').select('*');

	const { data: dataCategories } = await supabase.from('categories').select('*');

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

	return { sizes, colors, categories };
};
