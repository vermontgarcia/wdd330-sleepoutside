import { renderListWithTemplate } from './utils.mjs';

function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="product_pages/index.html?product=${product.Id}">
      <img src="${product.ImageUrl}" alt="Image of ${product.Name}" />
    </a>
    <h3 class="card__brand">${product.Brand.Name}</h3>
    <h2 class="card__name">${product.Name}</h2>
    <p class="product-card__price">$${product.FinalPrice}</p>
  </li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.fullList = []; // Store full product list
  }

  async init() {
    this.fullList = await this.dataSource.getData(this.category); // Pass category
    this.renderList(this.fullList); // Render products
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }

  filterProducts(query) {
    const filteredList = this.fullList.filter(product =>
      product.Name.toLowerCase().includes(query.toLowerCase())
    );
    this.renderList(filteredList); // Update displayed list
  }
}
