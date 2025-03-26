import { addProductToCart, qs } from './utils.mjs';

const productDetailsTemplate = (product) => `<section class="product-detail">
        <h3>${product.Brand.Name}</h3>

        <h2 class="divider">${product.NameWithoutBrand}</h2>

        <img
          class="divider"
          src="${product.Image}"
          alt="${product.NameWithoutBrand}"
        />

        <p class="product-card__price">${product.FinalPrice}</p>

        <p class="product__color">${product.Colors[0].ColorName}</p>

        <p class="product__description">
        ${product.DescriptionHtmlSimple}
        </p>

        <div class="product-detail__add">
          <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
        </div>
      </section>`;

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails('main');
    qs('#addToCart').addEventListener('click', this.addToCart.bind(this));
  }

  addToCart() {
    addProductToCart(this.product);
  }

  renderProductDetails(selector) {
    qs(selector).insertAdjacentHTML(
      'afterBegin',
      productDetailsTemplate(this.product),
    );
  }
}
