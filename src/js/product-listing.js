import { loadHeaderFooter, getParam, qs } from './utils.mjs';
import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';

const category = getParam('category'); // Get category from URL
const productData = new ProductData(category);
const productList = new ProductList(category, productData, qs('#product-list'));
productList.init();

loadHeaderFooter();
