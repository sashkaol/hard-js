const products = [
    {id: 1, title: 'Notebook', price: 20000},
    {id: 2, title: 'Mouse', price: 1500},
    {id: 3, title: 'Keyboard', price: 5000},
    {id: 4, title: 'Gamepad'},
    {id: 5, price: 2000},
];

const renderProduct = (title = 'Товар...', price = 'Цена не указана') => {
    return `<div class="product-item">
                <h3>${title}</h3>
                <p>${price}</p>
                <button class="by-btn">Добавить в корзину</button>
              </div>`;
};

/*let productArr = [];

for (let i = 0; i < products.length; i++) {
    let price = products[i]['price'];
    let title = products[i]['title'];
    let product = renderProduct(title, price);
    productArr.push(product);
}

document.getElementsByClassName('products')[0].innerHTML = productArr.join('');*/

for (let i = 0; i < products.length; i++) {
    let price = products[i]['price'];
    let title = products[i]['title'];
    let product = document.createElement('div');
    product.innerHTML = renderProduct(title, price);
    document.getElementsByClassName('products')[0].append(product);
}


/*const renderProducts = (list = []) => {
    const productList = list.map((item) => {
        return renderProduct(item.title, item.price);
    });
    // let productList = [];

    // for (let i = 0; i < list.length; i++) {
    //     productList.push(renderProduct(list[i].title, list[i].price));
    // }
    // for (const item of list) {
    //     productList.push(renderProduct(item.title, item.price));
    // }

    document.querySelector('.products').innerHTML = productList.join('');
    // console.log(productList);
}


renderProducts(products);*/

