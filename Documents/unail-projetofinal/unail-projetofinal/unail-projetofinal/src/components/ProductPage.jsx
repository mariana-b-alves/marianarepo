import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import  productData  from '../../js/data/productData.json';
import ShoppingCart from './ShoppingCart';
import TransactionForm from './TransactionForm';
import { CartContext } from './CartContext';
import '../../css/products_index.css';
import '../../css/shopping_cart_trans_done.css';
import '../../css/nav.css';

const ProductPage = () => {
  const currentProductKey = 'mixed-shape-crystals';
  const product = productData.find(p => p.id === currentProductKey);
  
  const [counter, setCounter] = useState(1);
  const [menuOpen, setMenuOpen] = useState(false);
  const [randomProducts, setRandomProducts] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [showTransactionForm, setShowTransactionForm] = useState(false);

  const { totalItems, addToCart } = useContext(CartContext);

  useEffect(() => {
    const storedCounter = localStorage.getItem('cartCounter');
    if (storedCounter) setCounter(Number(storedCounter));
  }, []);

  useEffect(() => {
    localStorage.setItem('cartCounter', counter);
  }, [counter]);

  useEffect(() => {
    const otherKeys = Object.keys(productData).filter(k => k !== currentProductKey);
    const shuffled = otherKeys.sort(() => 0.5 - Math.random());
    setRandomProducts(shuffled.slice(0, 3));
  }, []);

  useEffect(() => {
    if (showTransactionForm) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showTransactionForm]);

  const handleAddToCart = () => {
    addToCart({
      id: currentProductKey,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: counter,
    });
    setCartOpen(true);
  };

  const handleConfirmCart = () => {
    setCartOpen(false);
    setShowTransactionForm(true);
  };

  const handleCloseTransactionForm = () => {
    setShowTransactionForm(false);
  };

  return (
    <div>
      <header>
        <figure>
          <a href="/"><img src="/img/unail-logo.png" alt="Logo da U Nail" /></a>
        </figure>
        <nav>
          <ul>
            <li><a href="/portfolio.html">PORTEFÓLIO</a></li>
            <li><a href="/prices.html">PREÇÁRIO</a></li>
            <li><a href="/store.html">LOJA</a></li>
            <li><a href="/contacts.html">CONTACTOS</a></li>
          </ul>
          <div className="nav-icons">
            <div style={{ position: 'relative', cursor: 'pointer' }} onClick={() => setCartOpen(true)}>
              <span className="material-symbols-outlined shopping-cart-icon" style={{ fontSize: '32px' }}>
                shopping_cart
              </span>
              {totalItems > 0 && (
                <span className="shopping-cart-badge">{totalItems}</span>
              )}
            </div>
            <div className="hamburger" onClick={() => setMenuOpen(true)}>&#9776;</div>
          </div>
        </nav>
      </header>

      <section className={`overlay ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(false)}></section>
      <section className={`sideNav ${menuOpen ? 'open' : ''}`}>
        <article>
          <a className="closeBtn" onClick={() => setMenuOpen(false)}>&times;</a>
          <a href="/portfolio.html">PORTEFÓLIO</a>
          <a href="/prices.html">PREÇÁRIO</a>
          <a href="/store.html">LOJA</a>
          <a href="/contacts.html">CONTACTOS</a>
        </article>
      </section>

      <main>
        <section className="product">
          <figure className="c1xr3">
            <img src={product.image} alt={product.title} />
          </figure>
          <article className="content">
            <p>{product.description}</p>
            <p>{product.title}</p>
            <p>{product.price.toFixed(2)}€</p>
            <p>{product.details}</p>

            <article className="addRemoveItemsCounter">
              <button className="minus" onClick={() => setCounter(prev => Math.max(prev - 1, 1))}>-</button>
              <div className="add" id="counter"><p>{counter}</p></div>
              <button className="plus" onClick={() => setCounter(prev => prev + 1)}>+</button>
            </article>

            <p>Total: {(product.price * counter).toFixed(2)}€</p>
            <button className="btn" onClick={handleAddToCart}>ADICIONAR AO CARRINHO</button>
          </article>
        </section>

        <section className="title">
          <h1>OUTROS PRODUTOS</h1>
        </section>

        <section className="other-products">
          {randomProducts.map((key) => {
            const p = productData[key];
            return (
              <article key={key}>
                <figure className="c1xr3">
                  <Link to={`/product/${key}`}>
                    <img src={p.image} alt={p.title} />
                  </Link>
                </figure>
                <p>{p.description}</p>
                <p>{p.title}</p>
                <p>{p.price.toFixed(2)}€</p>
              </article>
            );
          })}
        </section>

        <ShoppingCart
          isOpen={cartOpen}
          onClose={() => setCartOpen(false)}
          onConfirm={handleConfirmCart}
        />

        {showTransactionForm && (
          <div className="modal-overlay" onClick={handleCloseTransactionForm}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <button
                className="modal-close-btn"
                aria-label="Fechar formulário de pagamento"
                onClick={handleCloseTransactionForm}
              >
                &times;
              </button>
              <TransactionForm onClose={handleCloseTransactionForm} />
            </div>
          </div>
        )}
      </main>


      <footer>
        <aside>
          <section><p>Horário</p></section>
          <p>Segunda a Sexta</p>
          <p>10:00-12:00</p>
          <p>13:00-19:00</p>
          <p>Domingo</p>
          <p>Fechado</p>
        </aside>
        <aside>
          <section><p>Contactos</p></section>
          <section>
            <svg xmlns="http://www.w3.org/2000/svg" height="35px" viewBox="0 -960 960 960" width="35px" fill="#FFFFFF">
              <a href="tel:911782869">
                <path d="M790.5-125Q677-125 558-180.5T338-338Q236-439 180.5-557.75T125-790.69q0-18.81 12.71-31.56Q150.43-835 169.5-835H306q14 0 23.75 9.75t13.75 24.75l26.93 123.64Q372-663.5 369.5-652t-10.23 19.23L261-533q26 44 54.69 81.66Q344.38-413.68 379-380q36.5 38 77.25 69.32Q497-279.35 542-255l95.54-98q9.46-10.5 21.36-14.25 11.9-3.75 23.6-1.75l117.36 25.44Q815-340 825-327.8t10 27.3v131q0 19.07-12.71 31.79Q809.57-125 790.5-125ZM232-585.5l81-82-23.5-110H183q1.5 41.5 13 88.25t36 103.75Zm364 358q40 19 88.17 31 48.16 12 93.33 14v-107l-102-21.5-79.5 83.5Zm-364-358Zm364 358Z"/>
              </a>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" height="35px" viewBox="0 -960 960 960" width="35px" fill="#FFFFFF">
              <a href="mailto:alamusiunail2023@gmail.com">
                <path d="M142.5-164.5q-22.97 0-40.23-17.27Q85-199.03 85-222v-516q0-22.97 17.27-40.23 17.26-17.27 40.23-17.27h675q22.97 0 40.23 17.27Q875-760.97 875-738v516q0 22.97-17.27 40.23-17.26 17.27-40.23 17.27h-675ZM480-464.25 142.5-685.5V-222h675v-463.5L480-464.25Zm0-57.25L813-738H148l332 216.5Zm-337.5-164V-738v516-463.5Z"/>
              </a>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="35px" height="35px" fill="#FFFFFF" className="bi bi-instagram" viewBox="0 0 16 16">
              <a href="https://www.instagram.com/u_nail_2023/">
                <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16c2.174 0 2.446-.01 3.299-.048.852-.04 1.433-.174 1.942-.372a3.908 3.908 0 0 0 1.417-.923 3.91 3.91 0 0 0 .923-1.417c.198-.51.333-1.09.372-1.942.038-.853.048-1.125.048-3.297 0-2.174-.01-2.446-.048-3.299-.04-.852-.174-1.433-.372-1.942a3.9 3.9 0 0 0-.923-1.417 3.902 3.902 0 0 0-1.417-.923c-.51-.198-1.09-.333-1.942-.372C10.446.01 10.174 0 8 0Zm0 1.44c2.14 0 2.395.008 3.241.047.782.035 1.206.165 1.49.274.38.143.652.314.937.6.286.286.458.56.6.938.109.285.24.708.273 1.49.04.846.047 1.102.047 3.241 0 2.139-.007 2.394-.047 3.24-.034.782-.165 1.206-.274 1.49a2.515 2.515 0 0 1-.6.937 2.53 2.53 0 0 1-.938.6c-.285.109-.708.24-1.49.273-.846.04-1.101.047-3.241.047-2.139 0-2.394-.007-3.24-.047-.782-.034-1.206-.165-1.49-.274a2.53 2.53 0 0 1-.938-.6 2.515 2.515 0 0 1-.6-.938c-.109-.284-.24-.708-.273-1.49-.04-.846-.047-1.101-.047-3.241 0-2.139.007-2.394.047-3.24.034-.782.165-1.206.274-1.49.143-.38.314-.652.6-.937.286-.286.56-.458.938-.6.285-.109.708-.24 1.49-.273.846-.04 1.101-.047 3.241-.047Zm0 3.94a3.62 3.62 0 1 0 0 7.24 3.62 3.62 0 0 0 0-7.24Zm0 5.97a2.35 2.35 0 1 1 0-4.7 2.35 2.35 0 0 1 0 4.7Zm3.645-6.588a.84.84 0 1 1-1.68 0 .84.84 0 0 1 1.68 0Z" />
              </a>
            </svg>
          </section>
        </aside>
      </footer>
    </div>
  );
};

export default ProductPage;
