// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener('touchend', (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener('click', callback);
}

export const getParam = (param) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
};

export const addProductToCart = (product) => {
  const cartItems = getLocalStorage('so-cart') || [];
  const existingItemIndex = cartItems.findIndex(item => item.Id === product.Id);

  if (existingItemIndex > -1) {
    // If product already exists, update its quantity
    cartItems[existingItemIndex].quantity += product.quantity;
  } else {
    // Otherwise, add the product to the cart
    cartItems.push(product);
  }

  setLocalStorage('so-cart', cartItems);
};

export const renderListWithTemplate = (
  templateFunction,
  parentElement,
  list,
  position = 'afterBegin',
  clear = false,
) => {
  const htmlStrins = list.map(templateFunction);
  if (clear) {
    parentElement.innerHTML = '';
  }
  parentElement.insertAdjacentHTML(position, htmlStrins.join(''));
};

export const renderWithTemplate = (template, parentElement, data, callback) => {
  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
};

export const loadTemplate = async (path) => {
  const response = await fetch(path);
  return response.text();
};

export const loadHeaderFooter = async () => {
  const header = await loadTemplate('../partials/header.html');
  const headerElement = qs('#header');
  const footer = await loadTemplate('../partials/footer.html');
  const footerElement = qs('#footer');

  renderWithTemplate(header, headerElement);
  renderWithTemplate(footer, footerElement);
};
