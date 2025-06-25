import React, { useContext, useState } from 'react';
import { CartContext } from './CartContext';
import  productData  from '../../js/data/productData.json';
import TransactionDone from './TransactionDone';
import TransactionErr from './TransactionErr';
import '../../css/form.css';

const TransactionForm = ({ onClose }) => {
  const { cartItems } = useContext(CartContext);

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

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    district: 'placeholder',
    postal: '',
    taxPayerNumber: '',
  });

  const [isTransactionSuccess, setIsTransactionSuccess] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

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
          setIsTransactionSuccess(true);
          setShowModal(true);
          alert('Compra efetuada com sucesso!');
        } else {
          setIsTransactionSuccess(false);
          setShowModal(true);
          alert('Erro ao processar a compra.');
        }
      })
      .catch(() => {
        setIsTransactionSuccess(false);
        setShowModal(true);
        alert('Erro na comunicação com o servidor.');
      });
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('transactionForm')) {
      onClose();
    }
  };

  return (
    <section
      className="transactionForm open"
      id="transactionFormPopup"
      onClick={handleOverlayClick}
    >
      <article className="container-all">
        <a className="closeBtn" onClick={onClose}>
          &times;
        </a>

        <article className="container-product">
          {productsInCart.map((item) => (
            <article key={`${item.id}-${item.color}`}
            className="content"
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              maxWidth: '10em',
              margin: '0 auto',
            }}
          >
            <figure
              className="c1xr3"
              style={{
                width: '6em',
                height: '6em',
                borderRadius: '15px',
                overflow: 'hidden',
                margin: 0,
                marginBottom: '0.5em',
              }}
            >
              <img
                src={item.image}
                alt={item.description}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </figure>
              <div className="product-text">
                <p style={{ margin: '0.1em 0' }}>{item.description}</p>
                <p style={{ margin: '0.1em 0' }}>{item.title}</p>
                {item.color && (
                  <p style={{ margin: '0.1em 0' }}>
                    Cor:
                    <span
                      style={{
                        display: 'inline-block',
                        width: '.7em',
                        height: '.7em',
                        borderRadius: '50%',
                        backgroundColor: item.color,
                        marginLeft: '.3em',
                        verticalAlign: 'middle',
                        border: '1px solid #000',
                      }}
                    />
                  </p>
                )}
                <p style={{ margin: '0.1em 0' }}>{item.price.toFixed(2)}€</p>
                <article className="addRemoveItemsCounter" style={{ margin: '0.1em 0' }}>
                  <div className="add">
                    <p>{item.quantity}</p>
                  </div>
                </article>
                <p style={{ margin: '0.1em 0' }}>
                  Total: {(item.price * item.quantity).toFixed(2)}€
                </p>
              </div>
            </article>
          ))}
        </article>

        <article className="container-info">
          <form className="form-info" onSubmit={handleSubmit}>
            <label htmlFor="name">Nome:</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Nome e apelido"
              autoFocus
              required
              value={formData.name}
              onChange={handleChange}
            />

            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={handleChange}
            />

            <label htmlFor="address">Morada:</label>
            <input
              type="text"
              name="address"
              id="address"
              placeholder="Morada"
              required
              value={formData.address}
              onChange={handleChange}
            />

            <label htmlFor="city">Cidade:</label>
            <input
              type="text"
              name="city"
              id="city"
              placeholder="Cidade"
              required
              value={formData.city}
              onChange={handleChange}
            />

            <label htmlFor="district">Distrito:</label>
            <select
              name="district"
              id="district"
              required
              value={formData.district}
              onChange={handleChange}
            >

              <option value="placeholder" disabled>
                Selecione um distrito
              </option>
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

            <label htmlFor="postal">Código Postal:</label>
            <input
              type="text"
              name="postal"
              id="postal"
              placeholder="Código Postal"
              required
              value={formData.postal}
              onChange={handleChange}
            />

            <label htmlFor="taxPayerNumber">Nº Contribuinte:</label>
            <input
              type="text"
              name="taxPayerNumber"
              id="taxPayerNumber"
              placeholder="Nº Contribuinte"
              value={formData.taxPayerNumber}
              onChange={handleChange}
            />

            <button type="submit" className="btn" id="confirmBtn">
              CONFIRMAR
            </button>
            <button className="btn" id="cancelBtn" onClick={onClose}>
              CANCELAR
            </button>
          </form>
        </article>
      </article>

      {showModal &&
        (isTransactionSuccess ? (
          <TransactionDone onClose={onClose} />
        ) : (
          <TransactionErr onClose={onClose} />
        ))}
    </section>
  );
};

export default TransactionForm;
