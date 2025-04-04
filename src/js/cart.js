import {
  getCart,
  getCartTotal,
  loadHeaderFooter,
  qs,
  setCart,
  showUpdateCartBadge,
} from './utils.mjs';

const cartItemTemplate = (
  {
    Id: id,
    NameWithoutBrand: name,
    Images: {
      PrimarySmall: smallUrl,
      PrimaryMedium: mediumUrl,
      PrimaryLarge: largeUrl,
      PrimaryExtraLarge: extraLargeUrl,
    },
    FinalPrice: price,
    Colors,
    quantity,
  },
  index,
) => {
  const finalPrice = price * quantity;
  return `
  <li class="cart-card divider">
    <a href="/product_pages/?product=${id}" class="cart-card__image">
      <picture>
        <source media="(min-width: 1500px)" srcset="${extraLargeUrl}" />
        <source media="(min-width: 1000px)" srcset="${largeUrl}" />
        <source media="(min-width: 800px)" srcset="${mediumUrl}" />
        <img src="${smallUrl}" alt="Image of ${name}" />
      </picture>
    </a>
    <a href="/product/${id}">
      <h2 class="card__name">${name}</h2>
    </a>
    <p class="cart-card__color">${Colors[0].ColorName}</p>
    <div class="cart-card__quantity">
      <label for="quantity-${index}">Qty:</label>
      <input type="number" id="quantity-${index}" data-index="${index}" value="${quantity || 1}" min="1" />
    </div>
    <p class="cart-card__price">$${finalPrice.toFixed(2)}</p>
  </li>
  `;
};

const updateQuantity = (event) => {
  const index = event.target.dataset.index;
  const newQuantity = parseInt(event.target.value);
  if (newQuantity < 1) return; // Prevent invalid quantities

  const cartItems = getCart();
  cartItems[index].quantity = newQuantity;
  setCart(cartItems);
  renderCartContents(); // Re-render cart to reflect changes
  showUpdateCartBadge();
};

const addQuantityListeners = () => {
  const quantityInputs = document.querySelectorAll(
    '.cart-card__quantity input',
  );
  quantityInputs.forEach((input) => {
    input.addEventListener('change', updateQuantity);
  });
};

const renderCartContents = () => {
  const cartItems = getCart();
  const htmlItems = cartItems.map((item, index) =>
    cartItemTemplate(item, index),
  );
  document.querySelector('.product-list').innerHTML = htmlItems.join('');
  addQuantityListeners(); // Add listeners for quantity changes
  qs('#total').innerHTML = getCartTotal(cartItems).toFixed(2);
  if (cartItems.length > 0) {
    qs('#cart-footer').classList.remove('hide');
    qs('#checkout-btn').classList.remove('hide');
  }
  else {
    qs('#cart-footer').classList.add('hide');
    qs('#checkout-btn').classList.add('hide');
  }
};

loadHeaderFooter();
renderCartContents();
