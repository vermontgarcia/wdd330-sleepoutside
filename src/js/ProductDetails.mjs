import { addProductToCart, qs } from './utils.mjs';

const productDetailsTemplate = (product) => {
  const {
    Id: id,
    Brand: { Name: brandName },
    NameWithoutBrand: name,
    Images: {
      PrimarySmall: smallUrl,
      PrimaryMedium: mediumUrl,
      PrimaryLarge: largeUrl,
      PrimaryExtraLarge: extraLargeUrl,
    },
    FinalPrice: finalPrice,
    DescriptionHtmlSimple: description,
    Colors,
  } = product;
  return `
    <section class="product-detail">
      <h3>${brandName}</h3>
      <h2 class="divider">${name}</h2>
      <picture>
        <source media="(min-width: 1500px)" srcset="${extraLargeUrl}" />
        <source media="(min-width: 1000px)" srcset="${largeUrl}" />
        <source media="(min-width: 800px)" srcset="${mediumUrl}" />
        <img src="${smallUrl}" alt="Image of ${name}" />
      </picture>
      <p class="product-card__price">${finalPrice}</p>
      <p class="product__color">${Colors[0].ColorName}</p>
      <p class="product__description">${description}</p>
      <div class="product-detail__add">
        <button id="addToCart" data-id="${id}">Add to Cart</button>
      </div>
    </section>
  `;
};

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
