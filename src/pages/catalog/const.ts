import LANGUAGE from '../../types/const';

export const SORTING_OPTION = {
  nameAsc: 'name: A - Z',
  nameDesc: 'name: Z - A',
  priceAsc: 'price: Low - High',
  priceDesc: 'price: High - Low',
};

export const SORTING_ORDER = {
  [SORTING_OPTION.nameAsc]: `name.${LANGUAGE} asc`,
  [SORTING_OPTION.nameDesc]: `name.${LANGUAGE} desc`,
  [SORTING_OPTION.priceAsc]: 'price asc',
  [SORTING_OPTION.priceDesc]: 'price desc',
};

export const PRODUCT_COLORS = ['blue', 'green', 'red', 'yellow'];

export const CATEGORIES: { [key: string]: string } = {
  elephants: 'df56876c-9e34-4964-9d57-b1d0ebaea778',
  'test products': '',
};

export const QUERY_BASE = {
  category: 'filter.query=categories.id',
  color: 'filter.query=variants.attributes.color.key',
  price: 'filter.query=variants.price.centAmount',
};
