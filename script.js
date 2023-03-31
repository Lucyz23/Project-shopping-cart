function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function refreshPrice() {
  let value = 0;

  document.querySelectorAll('.cart__items .cart__item .cart_item-price').forEach(node => {
    value += Number(node.innerText);
  });

  document.querySelector('.total-price').innerHTML = `R$: ${value.toFixed(2)}`;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));

  const button = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  button.addEventListener('click', () => {
    const loading = document.createElement('span');
    loading.classList = 'loading';
    loading.innerHTML = 'carregando...';
    document.querySelector('.cart__items').appendChild(loading);

    fetchItem(sku).then((product) => {
      document.querySelector('.cart__items').querySelector('.loading').remove();
      document.querySelector('.cart__items').appendChild(createCartItemElement({ sku: product.id, name: product.title, salePrice: product.price }));

      saveCartItems(document.querySelector('.cart__items').innerHTML);
      refreshPrice();
    });
  });
  section.appendChild(button);

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  event.target.closest('.cart__item').remove();
  saveCartItems(document.querySelector('.cart__items').innerHTML);
  refreshPrice();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';

  const innerItem = document.createElement('div');
  innerItem.style.display = 'flex';

  const content = document.createElement('div');

  const info = document.createElement('div');
  info.innerText = `SKU: ${sku} | NAME: ${name}`;

  const priceWrapper = document.createElement('div');
  const priceTag = document.createElement('span')
  priceTag.innerHTML = 'PRICE: $';
  priceWrapper.appendChild(priceTag);

  const price = document.createElement('span');
  price.classList = 'cart_item-price';
  price.innerText = salePrice;
  priceWrapper.appendChild(price);

  content.appendChild(info);
  content.appendChild(priceWrapper);
  innerItem.appendChild(content);

  const removeButton = document.createElement('span');
  removeButton.innerText = 'X';
  removeButton.classList = 'cart__item-remove';
  removeButton.addEventListener('click', cartItemClickListener);
  innerItem.appendChild(removeButton);

  li.appendChild(innerItem);

  return li;
}

window.onload = () => {
  document.querySelector('.cart__items').innerHTML = getSavedCartItems();
  refreshPrice();
  if (document.querySelectorAll('.cart__item-remove')) {
    document.querySelectorAll('.cart__item-remove').forEach(el => {
      el.addEventListener('click', cartItemClickListener);
    });
  }

  document.querySelector('.empty-cart').addEventListener('click', () => {
    localStorage.setItem('cartItems', '');
    document.querySelector('.cart__items').innerHTML = '';
    refreshPrice();
  });

  const loading = document.createElement('span');
  loading.classList = 'loading';
  loading.innerHTML = 'carregando...';

  document.querySelector('.items').appendChild(loading);

  fetchProducts('computador').then(products => {
    document.querySelector('.items').innerHTML = '';

    products.results.forEach(product => {
      document.querySelector('.items').appendChild(createProductItemElement({ sku: product.id, name: product.title, image: product.thumbnail }));
    });
  });
};
