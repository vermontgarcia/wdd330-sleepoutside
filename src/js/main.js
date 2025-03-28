import { loadHeaderFooter, qs } from './utils.mjs';
import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';

const productData = new ProductData('tents');
const producList = new ProductList('tents', productData, qs('#product-list'));
producList.init();

loadHeaderFooter();
