import React, { useContext, useState } from 'react';
import { CartContext } from './CartContext';
import  productData  from '../../js/data/productData.json';
import TransactionDone from './TransactionDone';
import TransactionErr from './TransactionErr';
import '../../css/shopping_cart_trans_done.css';

const ShoppingCart = ({ isOpen, onClose, onConfirm }) => {
  const { cartItems, removeFromCart } = useContext(CartContext);
  const [transactionResult, setTransactionResult] = useState('');

  const totalPrice = cartItems
    .reduce((sum, item) => {
      const product = productData[item.id];
      return sum + (product ? product.price * item.quantity : 0);
    }, 0)
    .toFixed(2);

  const handleConfirm = () => {
    onClose();
    onConfirm();

    const payload = {
      cart: cartItems,
      total: totalPrice,
    };

    fetch('/../../sendmail/sendmail.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setTransactionResult('success');
        } else {
          setTransactionResult('error');
        }
      })
      .catch(() => {
        setTransactionResult('error');
      });
  };

  const handleCloseTransaction = () => {
    setTransactionResult('');
  };

  if (!isOpen) return null;

  return (
    <>
      <section className={`shoppingCart ${isOpen ? 'open' : ''}`} onClick={onClose}>
        <div className="container" onClick={(e) => e.stopPropagation()}>
          <a className="closeBtn" onClick={onClose} role="button" tabIndex={0} aria-label="Close shopping cart" onKeyDown={(e) => { if (e.key === 'Enter') onClose(); }}>&times;</a>
          {cartItems.length === 0 ? (
            <p>Carrinho vazio</p>
          ) : (
            <>
              <div className="cart-items-list">
                {cartItems.map((item) => {
                  const product = productData[item.id];
                  if (!product) return null;
                  return (
                    <article key={item.id} className="cart-item">
                      <figure>
                        <img src={product.image} alt={product.title} />
                      </figure>
                      <article className="content">
                        <p>{product.description}</p>
                        <p>{product.title}</p>
                        <article className="addRemoveItemsCounter">
                          <div className="add"><p>{item.quantity}</p></div>
                        </article>
                        <p>Preço: {product.price.toFixed(2)}€</p>
                        <p>Total: {(product.price * item.quantity).toFixed(2)}€</p>

                        {item.color && (
                          <p>
                            Cor:&nbsp;
                            <span
                              style={{
                                display: 'inline-block',
                                width: '16px',
                                height: '16px',
                                borderRadius: '50%',
                                backgroundColor: item.color,
                                border: '1px solid #999',
                                verticalAlign: 'middle'
                              }}
                              title={item.color}
                            />
                          </p>
                        )}
                        <button className="btn" onClick={() => removeFromCart(item.id)}>REMOVER</button>
                      </article>
                    </article>
                  );
                })}
                <div className="cart-buttons">
                  <button className="btn" id="confirmBtn" onClick={handleConfirm}>
                    CONFIRMAR
                  </button>
                  <button className="btn" id="cancelBtn" onClick={onClose}>
                    CANCELAR
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
        {cartItems.length > 0 && (
          <p style={{ color: '#57402c', textAlign: 'center', marginTop: '1em' }}>
            Total Geral: {totalPrice}€
          </p>
        )}
      </section>
      {transactionResult === 'success' && <TransactionDone onClose={handleCloseTransaction} />}
      {transactionResult === 'error' && <TransactionErr onClose={handleCloseTransaction} />}
    </>
  );
};

export default ShoppingCart;
