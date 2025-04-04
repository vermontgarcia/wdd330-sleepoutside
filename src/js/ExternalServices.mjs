const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error('Bad Response');
  }
}

export default class ExternalServices {
  constructor(category) {
    this.category = category;
  }

  async getData(category) {
    try {
      const response = await fetch(`${baseURL}products/search/${category}`);
      const data = await convertToJson(response);
      return data.Result;
    } catch (error) {
      return []; // Return empty array if fetch fails
    }
  }

  async findProductById(id) {
    try {
      const response = await fetch(`${baseURL}product/${id}`);
      const data = await convertToJson(response);
      return data.Result;
    } catch (error) {
      return {};
    }
  }

  async submitOrder(order) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    };
    try {
      const response = await fetch(`${baseURL}checkout/`, options);
      const data = await convertToJson(response);
      return data.Result;
    } catch (error) {
      return {
        error,
      };
    }
  }
}
