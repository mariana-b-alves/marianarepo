import { showTransactionDone } from './transactionDone.js';
import { showTransactionErr } from './transactionErr.js';
import productData from './data/productData.json';

export function injectTransactionForm() {
  const existingForm = document.getElementById('transactionFormPopup');
  if (existingForm) return;

  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  const productsInCart = cartItems.map((item) => {
    const product = productData[item.id];
    return {
      id: item.id,
      quantity: item.quantity,
      description: product?.description || '',
      title: product?.title || '',
      price: product?.price || 0,
      image: product?.image || '',
      color: item.color || null,
    };
  });

  const totalPrice = productsInCart
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  const formSection = document.createElement('section');
  formSection.className = 'transactionForm open';
  formSection.id = 'transactionFormPopup';

  formSection.innerHTML = `
    <article class="container-all">
      <a class="closeBtn" id="formCloseBtn">&times;</a>

      <article class="container-product">
        ${productsInCart
          .map(
            (item) => `
          <article class="content" style="
            display: flex;
            flex-direction: column;
            max-width: 200px;
            margin: 0 auto;
          ">
            <figure class="c1xr3" style="
              width: 7em;
              height: 7em;
              border-radius: 15px;
              overflow: hidden;
              margin: 0 0 0.75em 0;
            ">
              <img src="${item.image}" alt="${item.description}" style="
                width: 100%;
                height: 100%;
                object-fit: cover;
                display: block;
              " />
            </figure>
            <p>${item.description}</p>
            <p>${item.title}</p>
            ${
              item.color
                ? `<p>Cor: <span style="
                    display: inline-block;
                    width: .7em;
                    height: .7em;
                    border-radius: 50%;
                    background-color: ${item.color};
                    margin-left: .3em;
                    vertical-align: middle;
                    border: 1px solid #000;"></span></p>`
                : ''
            }
            <p>${item.price.toFixed(2)}€</p>
            <article class="addRemoveItemsCounter">
              <div class="add"><p>${item.quantity}</p></div>
            </article>
            <p>Total: ${(item.price * item.quantity).toFixed(2)}€</p>
          </article>
        `
          )
          .join('')}
      </article>

      <article class="container-info">
        <form class="form-info" id="transactionForm">
          <label for="name">Nome:</label>
          <input type="text" name="name" id="name" placeholder="Nome e apelido" required autofocus />

          <label for="email">Email:</label>
          <input type="email" name="email" id="email" placeholder="Email" required />

          <label for="address">Morada:</label>
          <input type="text" name="address" id="address" placeholder="Morada" required />

          <label for="city">Cidade:</label>
          <input type="text" name="city" id="city" placeholder="Cidade" required />

          <label for="district">Distrito:</label>
          <select name="district" id="district" required>
            <option value="" disabled selected>Selecione um distrito</option>
            <option value="acores">Açores</option>
            <option value="aveiro">Aveiro</option>
            <option value="beja">Beja</option>
            <option value="braga">Braga</option>
            <option value="braganca">Bragança</option>
            <option value="castelo">Castelo Branco</option>
            <option value="coimbra">Coimbra</option>
            <option value="evora">Évora</option>
            <option value="faro">Faro</option>
            <option value="guarda">Guarda</option>
            <option value="leiria">Leiria</option>
            <option value="lisboa">Lisboa</option>
            <option value="madeira">Madeira</option>
            <option value="portalegre">Portalegre</option>
            <option value="porto">Porto</option>
            <option value="santarem">Santarém</option>
            <option value="setubal">Setúbal</option>
            <option value="viana">Viana do Castelo</option>
            <option value="vilaReal">Vila Real</option>
            <option value="viseu">Viseu</option>
          </select>

          <label for="postal">Código Postal:</label>
          <input type="text" name="postal" id="postal" placeholder="Código Postal" required />

          <label for="taxPayerNumber">Nº Contribuinte:</label>
          <input type="text" name="taxPayerNumber" id="taxPayerNumber" placeholder="Nº Contribuinte" />

          <button type="submit" class="btn" id="confirmBtn">CONFIRMAR</button>
          <button type="button" class="btn" id="cancelBtn">CANCELAR</button>
        </form>
      </article>
    </article>
  `;

  document.body.appendChild(formSection);

  document.getElementById('formCloseBtn').addEventListener('click', closeForm);
  document.getElementById('cancelBtn').addEventListener('click', closeForm);

  document.addEventListener('keydown', function escClose(e) {
    if (e.key === 'Escape') {
      closeForm();
      document.removeEventListener('keydown', escClose);
    }
  });

  formSection.addEventListener('click', (e) => {
    if (e.target === formSection) {
      closeForm();
    }
  });

  document.getElementById('transactionForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(e.target).entries());

    const payload = {
      customer: formData,
      cart: productsInCart,
      total: totalPrice,
    };

    fetch('https://localhost:3000/submit-form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (res.ok) {
          closeForm();
          showTransactionDone(closeTransactionOverlay);
        } else {
          closeForm();
          showTransactionErr(closeTransactionOverlay);
        }
      })
      .catch(() => {
        closeForm();
        showTransactionErr(closeTransactionOverlay);
      });
  });

  function closeForm() {
    formSection.remove();
  }

  function closeTransactionOverlay() {
    const overlay = document.getElementById('transaction-form-overlay');
    overlay.innerHTML = '';
    overlay.classList.remove('open');
  }
}
