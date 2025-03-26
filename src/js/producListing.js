export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    // Fetch products for the specific category
    const list = await this.dataSource.getData(this.category);
    this.renderList(list);
  }

  renderList(list) {
    // Clear existing list
    this.listElement.innerHTML = '';
    
    // Create product cards for each item
    const htmlStrings = list.map(product => this.productCardTemplate(product));
    this.listElement.insertAdjacentHTML('afterbegin', htmlStrings.join(''));
  }

  productCardTemplate(product) {
    return `
      <li class="product-card">
        <a href="/product.html?id=${product.Id}">
          <img 
            src="${product.Images.PrimaryMedium}" 
            alt="${product.Name}"
          >
          <h3 class="card__brand">${product.Brand.Name}</h3>
          <h2 class="card__name">${product.Name}</h2>
          <p class="product-card__price">$${product.FinalPrice.toFixed(2)}</p>
        </a>
      </li>
    `;
  }
}
