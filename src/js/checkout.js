import {
  getLocalStorage,
  loadHeaderFooter,
  qs,
  getCartTotal,
} from './utils.mjs';

const TAX = 0.06;
const SHIPPING = 8;

export const getCartTotalItems = (cartItems) =>
  cartItems.reduce((acc, { quantity }) => acc + quantity, 0);

const summaryTemplate = (cartItems) => {
  const totalItems = getCartTotalItems(cartItems);
  const subtotal = getCartTotal(cartItems);
  const tax = subtotal * TAX;
  const shipping = SHIPPING + totalItems * 2;
  const orderTotal = subtotal + tax + shipping;

  return `
    <ul>
      <li>
        <strong>Subtotal:</strong>
        <div>
          <div>$</div>
          <span>${subtotal.toFixed(2)}</span>
        </div>
      </li>
      <li>
        <strong>Tax:</strong>
        <div>
          <div>$</div>
          <span>${tax.toFixed(2)}</span>
        </div>
      </li>
      <li>
        <strong>Shipping and Handling:</strong>
        <div>
          <div>$</div>
          <span>${shipping.toFixed(2)}</span>
        </div>
      </li>
      <hr />
      <li>
        <strong>Order Total:</strong>
        <div>
          <div>$</div>
          <span>${orderTotal.toFixed(2)}</span>
        </div>
      </li>
    </ul>
  `;
};

const buildCartSummary = () => {
  const cartItems = getLocalStorage('so-cart') || [];

  qs('#order-summary').insertAdjacentHTML(
    'afterbegin',
    summaryTemplate(cartItems),
  );
};

loadHeaderFooter();
buildCartSummary();
