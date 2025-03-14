import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';

const productData = new ProductData('tents');
const producList = new ProductList('tents', productData, document.getElementById('product-list'));
producList.init();
