import { loadHeaderFooter, getParam, qs } from './utils.mjs';
import ExternalServices from './ExternalServices.mjs';
import ProductList from './ProductList.mjs';

const category = getParam('category'); // Get category from URL
const productData = new ExternalServices(category);
const productList = new ProductList(category, productData, qs('#product-list'));

const formatedCategory =
  category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();

qs('#category').innerText = `${formatedCategory} Products`;
qs('title').innerText = `${formatedCategory} | Product Listing`;

productList.init();

loadHeaderFooter();
