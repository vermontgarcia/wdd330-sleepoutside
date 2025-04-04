import {
  getCartTotal,
  getCartTotalItems,
  qs,
  renderWithTemplate,
} from './utils.mjs';

const TAX = 0.06;
const SHIPPING = 8;

const summaryTemplate = ({ subtotal, tax, shipping, total }) => `
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
        <span>${total.toFixed(2)}</span>
      </div>
    </li>
  </ul>
`;

export default class CheckoutProcess {
  constructor(cart, summaryContainer) {
    this.cart = cart;
    this.summaryContainer = summaryContainer;
    this.subtotal = 0;
    this.tax = 0;
    this.shipping = 0;
    this.total = 0;
  }

  init() {
    qs('#zipCode').addEventListener('change', this.update.bind(this));

    this.calculateSubtotal();
    this.calculateTotal();
    this.displayTotalSumary();
  }

  update() {
    this.calculateTax();
    this.calculateShipping();
    this.calculateTotal();
    this.displayTotalSumary();
  }

  calculateSubtotal() {
    this.subtotal = getCartTotal(this.cart);
  }

  calculateTax() {
    this.tax = this.subtotal * TAX;
  }

  calculateShipping() {
    this.shipping = getCartTotalItems(this.cart) * 2 + SHIPPING;
  }

  calculateTotal() {
    this.total = this.subtotal + this.tax + this.shipping;
  }

  displayTotalSumary() {
    const summaryData = {
      subtotal: this.subtotal,
      tax: this.tax,
      shipping: this.shipping,
      total: this.total,
    };
    renderWithTemplate(summaryTemplate(summaryData), this.summaryContainer);
  }
}
