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

class Item {
  constructor(good) {
    this.id_product = good.id_product;
    this.product_name = good.product_name;
    this.price = good.price;
    this.img = good.img;
    //this.count = count;
  }

  render() {
    return ``;
  }
}

class CartItem extends Item {
  constructor(good) {
    super(good);
    this.quantity = 1;
  }

  render() {
    return `<div class="cart-item" data-id="${this.id_product}">
    <div class="product-bio">
    <img src="${this.img}" alt="Some image">
    <div class="product-desc">
    <p class="product-title">${this.product_name}</p>
    <p class="product-quantity">Количество: ${this.quantity}</p>
<p class="product-single-price">${this.price} за ед.</p>
</div>
</div>
<div class="right-block">
    <p class="product-price">${this.quantity * this.price} ₽</p>
    <button class="del-btn" data-id="${this.id_product}">&times;</button>
</div>
</div>`
  }
}

class ProductItem extends Item {
  render() {
    return `<div class="product-item" data-id="${this.id_product}">
    <img src="${this.img}" alt="Some img">
    <div class="desc">
        <h3>${this.product_name}</h3>
        <p>${this.price} ₽</p>
        <button class="buy-btn"
          data-id="${this.id_product}"
          data-name="${this.product_name}"
          data-price="${this.price}">Купить</button>
    </div>
</div>`;
  }
}

class List {
  constructor(url, container) {
    this.container = container;
    this.goods = [];
    this.url = url;
  }

  getJson(url) {
    return fetch(url ? url : `${API + this.url}`)
      .then(result => result.json())
      .catch(error => {
        alert(error);
      })
  }

  render() {
    this.clear();
    const container = document.querySelector(this.container);
    for (let good of this.goods) {
      container.insertAdjacentHTML('beforeend', good.render());
    }
  }

  addProduct(good) {
    this.goods.push(new this.itemConstructor(good));
    this.render();
  }

  removeProduct(good) {
    for (let i = 0; i < this.goods.length; i++) {
      console.log(this.goods[i].id_product);
      if (good.id_product === this.goods[i].id_product) {
        console.log('find');
        return this.goods.splice(i, 1);
      }
    }
    return false;
  }

  searchProduct(good) {
    for (let i = 0; i < this.goods.length; i++) {
      console.log(this.goods[i].id_product);
      if (good.id_product === this.goods[i].id_product) {
        console.log('find');
        return this.goods[i];
      }
    }
    return false;
  }

  clear() {
    const container = document.querySelector(this.container);
    while (container.firstChild) {
      container.removeChild(container.lastChild);
    }
  }
}

class CartList extends List {
  constructor(url, cart = '.cart-block') {
    super(url, cart)
    this.cart = cart;
    this._goods = [];
    this.itemConstructor = CartItem;

  }

  render() {
    super.render.call(this);
    const container = document.querySelector(this.container);
    let btns = container.querySelectorAll('.del-btn');
    [].slice.call(btns).forEach((el, n) => {
      el.addEventListener('click', () => {
        debugger
        let good = this.goods[n];
        let searchRes = this.searchProduct(good);
        if (searchRes) {
          searchRes.quantity--
          if (searchRes.quantity === 0) {
            this.removeProduct(searchRes);
          } else {
            console.error('fjgm');
          }
          this.render();
        }
      })
    });
  }
}

class ProductList extends List {
  constructor(url = "/catalogData.json", container = '.products') {
    super(url, container);
    this.goods = [];
    this._allProducts = [];
    this.cart = new CartList(); 
    this.itemConstructor = ProductItem;
    // this._fetchGoods();
    // this._render();
    this._getGoods()
        .then((data) => {
          this.goods = data.map(item=>{item.img = 'https://via.placeholder.com/50x100'; return item}).map(item=>new this.itemConstructor(item));
          this.render();
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

  render() {
    super.render.call(this);
    const container = document.querySelector(this.container);
    let btns = container.querySelectorAll('.buy-btn');
    [].slice.call(btns).forEach((el, n) => {
      el.addEventListener('click', () => {
        debugger
        let good = this.goods[n];
        let searchRes = this.cart.searchProduct(good);
        if (searchRes) {
          searchRes.quantity++
          this.cart.render();
        } else {
          this.cart.addProduct(good);
        }
      })
    });
  }
}

const catalog = new ProductList();
