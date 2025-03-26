import { getLocalStorage, loadHeaderFooter } from './utils.mjs';

function renderCartContents() {
  const cartItems = getLocalStorage('so-cart') || [];
  const htmlItems = cartItems.map((item, index) =>
    cartItemTemplate(item, index),
  );
  document.querySelector('.product-list').innerHTML = htmlItems.join('');
  addQuantityListeners(); // Add listeners for quantity changes
}

function cartItemTemplate(item, index) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <div class="cart-card__quantity">
    <label for="quantity-${index}">Qty:</label>
    <input type="number" id="quantity-${index}" data-index="${index}" value="${item.quantity || 1}" min="1" />
  </div>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

function addQuantityListeners() {
  const quantityInputs = document.querySelectorAll(
    '.cart-card__quantity input',
  );
  quantityInputs.forEach((input) => {
    input.addEventListener('change', updateQuantity);
  });
}

function updateQuantity(event) {
  const index = event.target.dataset.index;
  const newQuantity = parseInt(event.target.value);
  if (newQuantity < 1) return; // Prevent invalid quantities

  const cartItems = getLocalStorage('so-cart') || [];
  cartItems[index].quantity = newQuantity;
  setLocalStorage('so-cart', cartItems);
  renderCartContents(); // Re-render cart to reflect changes
}

loadHeaderFooter();
renderCartContents();
