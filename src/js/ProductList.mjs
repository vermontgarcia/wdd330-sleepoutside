import { renderListWithTemplate } from './utils.mjs';

const productCardTemplate = (product) => {
  const {
    id,
    Brand: { Name: brandName },
    NameWithoutBrand: name,
    Image: imageUrl,
    ListPrice: listPrice,
  } = product;
  return `<li class="product-card">
    <a href="product_pages/?product=${id}">
      <img
        src="${imageUrl}"
        alt="Image of ${name}"
      />
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
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }

  async init() {
    const list = await this.dataSource.getData();
    this.renderList(list);
  }

  filterProducts(query) {
    const filteredList = this.fullList.filter((product) =>
      product.Name.toLowerCase().includes(query.toLowerCase()),
    );
    this.renderList(filteredList); // Update displayed list
  }
}
