import ExternalServices from './ExternalServices.mjs';
import {
  getCartTotal,
  getCartTotalItems,
  qs,
  renderWithTemplate,
  setCart,
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

const apiClient = new ExternalServices();

export default class CheckoutProcess {
  constructor(cart, summaryContainer) {
    this.cart = cart;
    this.packageItems = [];
    this.summaryContainer = summaryContainer;
    this.subtotal = 0;
    this.tax = 0;
    this.shipping = 0;
    this.total = 0;
  }

  init() {
    qs('#zipCode')?.addEventListener('change', this.update.bind(this));
    qs('#form')?.addEventListener('submit', this.prepareForm.bind(this));
    this.packageItemsList();
    this.calculateSubtotal();
    this.calculateTotal();
    this.displayTotalSumary();
  }

  update() {
    this.calculateSubtotal();
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

  jsonFormData(form) {
    const formData = new FormData(form);
    return Object.fromEntries(formData.entries());
  }

  packageItemsList() {
    this.packageItems = this.cart.map(
      ({ Id: id, Name: name, ListPrice: price, quantity }) => ({
        id,
        name,
        price,
        quantity,
      }),
    );
  }

  addOrderData(form) {
    form.orderDate = new Date().toISOString();
    form.orderTotal = this.total;
    form.tax = this.tax;
    form.shipping = this.shipping;
    form.items = this.packageItems;
    const [year, month] = form.expiration.split('-');
    form.expiration = `${parseInt(month)}/${year.slice(-2)}`;
    return form;
  }

  prepareForm(event) {
    event.preventDefault();
    const form = this.jsonFormData(event.target);
    const order = this.addOrderData(form);
    this.submitOrder(order);
  }

  async submitOrder(order) {
    try {
      const newOrder = await apiClient.submitOrder(order);
      console.log({ order: newOrder });

      setCart([]); // Clear the cart after successful order submission
      window.location.replace('/checkout/success.html');
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('There was an error processing your order. Please try again.');
    }
  }
}