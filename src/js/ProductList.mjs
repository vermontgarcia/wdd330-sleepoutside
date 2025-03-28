import { qs, renderListWithTemplate } from './utils.mjs';

const productCardTemplate = (product) => {
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
    ListPrice: listPrice,
  } = product;
  return `<li class="product-card">
    <a href="/product_pages/?product=${id}">
      <picture>
        <source media="(min-width: 1500px)" srcset="${extraLargeUrl}" />
        <source media="(min-width: 1000px)" srcset="${largeUrl}" />
        <source media="(min-width: 800px)" srcset="${mediumUrl}" />
        <img
          src="${smallUrl}"
          alt="Image of ${name}"
        />
      </picture>
      <h3 class="card__brand">${brandName}</h3>
      <h2 class="card__name">${name}</h2>
      <p class="product-card__price">${listPrice}</p></a
    >
  </li>
  `;
};

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.searchBox = qs('#searchBox');
    this.list = [];
  }

  renderList(list, listElement, clear = false) {
    renderListWithTemplate(productCardTemplate, listElement, list, clear);
  }

  async init() {
    this.list = await this.dataSource.getData(this.category);
    this.renderList(this.list, this.listElement);
    this.searchBox.addEventListener('input', this.searchProducts.bind(this));
  }

  searchProducts(event) {
    const query = event.target.value.trim().toLowerCase();
    const filteredList = this.list?.filter((product) =>
      product.Name.toLowerCase().includes(query.toLowerCase()),
    );
    this.renderList(filteredList, this.listElement, true); // Update displayed list
  }
}
