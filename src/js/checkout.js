import CheckoutProcess from './CheckoutProcess.mjs';
import { getCart, loadHeaderFooter, qs } from './utils.mjs';

const cartItems = getCart();
const summaryContainer = qs('#order-summary');
const checkoutProcess = new CheckoutProcess(cartItems, summaryContainer);

checkoutProcess.init();

loadHeaderFooter();
