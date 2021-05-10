/*1. Переделайте makeGETRequest() так, чтобы она использовала промисы.
2. Добавьте в соответствующие классы методы добавления товара в корзину, удаления товара из корзины и получения списка товаров корзины.
3* Переделайте GoodsList так, чтобы fetchGoods() возвращал промис, а render() вызывался в обработчике этого промиса.*/

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// В ДЗ переделать на промисы не используя fetch

var getRequest = (url) => {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status !== 200) {
        reject('Error');
      } else {
        debugger;
        resolve(xhr.responseText);
        console.log(xhr.responseText);
      }
    }
  };
  xhr.send();
  }) 
}

class CartList extends ProductsList {
  constructor(cart = '.cart') {
    this.cart = cart;
    this._goods = [];

    this.addToCart();
  }
}

class CartGood extends ProductItem {
  
}

class ProductList {
  constructor(container = '.products') {
    this.container = container;
    this._goods = [];
    this._allProducts = [];

    this._fetchGoods();
    this._render();
    this._getGoods()
        .then((data) => {
          this._goods = data;
          this._render();
        });
  }

  sum() {
    return this._goods.reduce((sum, { price }) => sum + price, 0);
  }

  _fetchGoods() {
    return getRequest(API + '/catalogData.json').then(this._render.bind(this));
  }
  
  _getGoods() {
    return fetch(`${API}/catalogData.json`)
        .then(result => result.json()).catch(error => console.log(error));
  }

  _render() {
    const block = document.querySelector(this.container);

    for (const product of this._goods) {
      console.log(product);
      let productObject = new ProductItem(product);
      console.log(productObject);

      this._allProducts.push(productObject);
      block.insertAdjacentHTML('beforeend', productObject.render());
    }
  }
}

class ProductItem {
  constructor(product, img='https://via.placeholder.com/200x150') {
    this.title = product.product_name;
    this.price = product.price;
    this.id = product.id_product;
    this.img = img;
  }

  render() {
    return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} \u20bd</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`;
  }
}

const catalog = new ProductList();
