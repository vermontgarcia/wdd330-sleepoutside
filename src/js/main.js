import { loadHeaderFooter, qs } from './utils.mjs';
import ExternalServices from './ExternalServices.mjs';
import ProductList from './ProductList.mjs';

const productData = new ExternalServices('tents');
const producList = new ProductList('tents', productData, qs('#product-list'));
producList.init();

loadHeaderFooter();
