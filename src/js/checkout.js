import CheckoutProcess from './CheckoutProcess.mjs';
import { getLocalStorage, loadHeaderFooter, qs } from './utils.mjs';

const cartItems = getLocalStorage('so-cart') || [];
const summaryContainer = qs('#order-summary');
const checkoutProcess = new CheckoutProcess(cartItems, summaryContainer);

checkoutProcess.init();

loadHeaderFooter();
