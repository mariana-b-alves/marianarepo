import { injectTransactionForm } from './transactionForm.js';

export async function renderCartContents() {
  const container = document.getElementById('cart-summary');
  if (!container) return;

  container.innerHTML = '';

  const mainArticle = document.createElement('article');
  mainArticle.className = 'container';

  const closeBtn = document.createElement('a');
  closeBtn.className = 'closeBtn';
  closeBtn.id = 'closeBtn';
  closeBtn.innerHTML = '&times;';
  closeBtn.href = '#';
  closeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    container.classList.remove('open');
    const overlay = document.getElementById('cart-overlay');
    if (overlay) overlay.classList.remove('active');
  });
  mainArticle.appendChild(closeBtn);

  let productData;
  try {
    const response = await fetch('/js/data/productData.json');
    if (!response.ok) throw new Error('Failed to fetch product data');
    productData = await response.json();
  } catch {
    const errorMsg = document.createElement('p');
    errorMsg.textContent = 'Erro ao carregar dados dos produtos.';
    mainArticle.appendChild(errorMsg);
    container.appendChild(mainArticle);
    return;
  }

  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  if (cartItems.length === 0) {
    const emptyMsg = document.createElement('p');
    emptyMsg.textContent = 'Carrinho vazio';
    mainArticle.appendChild(emptyMsg);
    container.appendChild(mainArticle);
    return;
  }

  cartItems.forEach(item => {
    const product = productData[item.id];
    if (!product) return;

    const cartItem = document.createElement('article');
    cartItem.className = 'cart-item';

    const figure = document.createElement('figure');
    const img = document.createElement('img');
    img.src = product.image;
    img.alt = product.title;
    figure.appendChild(img);

    const content = document.createElement('article');
    content.className = 'content';

    const pDesc = document.createElement('p');
    pDesc.textContent = product.description || '';

    const pTitle = document.createElement('p');
    pTitle.textContent = product.title;

    const pPrice = document.createElement('p');
    pPrice.textContent = `${product.price.toFixed(2)}€`;

    const quantityCounter = document.createElement('article');
    quantityCounter.className = 'addRemoveItemsCounter';

    const quantityDiv = document.createElement('div');
    quantityDiv.className = 'add';
    const quantityP = document.createElement('p');
    quantityP.textContent = item.quantity;
    quantityDiv.appendChild(quantityP);

    quantityCounter.appendChild(quantityDiv);

    const pTotal = document.createElement('p');
    pTotal.textContent = `Total: ${(product.price * item.quantity).toFixed(2)}€`;

    const btnRemove = document.createElement('button');
    btnRemove.className = 'btn';
    btnRemove.textContent = 'REMOVER';
    btnRemove.addEventListener('click', () => {
      cartItems = cartItems.filter(ci => ci.id !== item.id || ci.color !== item.color);
      updateCart();
    });

    content.appendChild(pDesc);
    content.appendChild(pTitle);
    content.appendChild(pPrice);
    content.appendChild(quantityCounter);
    content.appendChild(pTotal);
    content.appendChild(btnRemove);

    cartItem.appendChild(figure);
    cartItem.appendChild(content);

    mainArticle.appendChild(cartItem);
  });

  const totalPriceAll = cartItems.reduce((sum, item) => {
    const product = productData[item.id];
    return product ? sum + product.price * item.quantity : sum;
  }, 0).toFixed(2);

  const totalP = document.createElement('h1');
  totalP.style.color = '#57402c';
  totalP.style.textAlign = 'center';
  totalP.style.marginTop = '1em';
  totalP.textContent = `Total Geral: ${totalPriceAll}€`;
  mainArticle.appendChild(totalP);

  const btnContainer = document.createElement('div');
  btnContainer.className = 'cart-buttons';

  const btnConfirm = document.createElement('button');
  btnConfirm.className = 'btn';
  btnConfirm.id = 'confirmBtn';
  btnConfirm.textContent = 'CONFIRMAR';
  btnConfirm.addEventListener('click', () => {
    container.classList.remove('open');
    const overlay = document.getElementById('cart-overlay');
    if (overlay) overlay.classList.remove('active');
    injectTransactionForm();
    const formPopup = document.getElementById('transactionFormPopup');
    if (formPopup) formPopup.classList.add('active');
  });

  const btnCancel = document.createElement('button');
  btnCancel.className = 'btn';
  btnCancel.id = 'cancelBtn';
  btnCancel.textContent = 'CANCELAR';
  btnCancel.addEventListener('click', () => {
    container.classList.remove('open');
    const overlay = document.getElementById('cart-overlay');
    if (overlay) overlay.classList.remove('active');
  });

  btnContainer.appendChild(btnConfirm);
  btnContainer.appendChild(btnCancel);
  mainArticle.appendChild(btnContainer);

  container.appendChild(mainArticle);

  function updateCart() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    renderCartContents();
  }
}

window.addEventListener('cartUpdated', renderCartContents);
document.addEventListener('DOMContentLoaded', renderCartContents);
