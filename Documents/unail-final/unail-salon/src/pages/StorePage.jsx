import { useState, useContext } from "react";
import "../../public/css/store_prices_index.css";
import productData from '../data/productData.json';
import Footer from '../features/templates/Footer'; 
import { CartContext } from '../features/components/CartContext';
import ShoppingCart from '../features/components/ShoppingCart';
import TransactionForm from '../features/components/TransactionForm';
import Header from '../features/templates/Header';
import SideNav from '../features/templates/SideNav';

function StorePage() {
  const { totalItems } = useContext(CartContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const [sideMenuOpen, setSideMenuOpen] = useState(false);

  const categories = {
    "VERNIZES E DECORAÇÃO": ["GEL", "KIT DE VERNIZES DE GEL", "PÓ PARA NAIL ART", "APLIQUES"],
    "FERRAMENTAS PARA NAIL ART": ["PINCÉIS", "AERÓGRAFO", "BROCA"],
  };

  const filteredProducts = (catArr) =>
    productData.filter((p) => catArr.includes(p.description));

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Header
          totalItems={totalItems}
          onCartClick={() => setCartOpen(true)}
          onMenuClick={() => setSideMenuOpen(true)}
        />

        <SideNav isOpen={sideMenuOpen} onClose={() => setSideMenuOpen(false)} />

        <main style={{ flex: "1" }}>
          <section className="searchBarSection">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
              type="text"
              name="searchBar"
              id="searchBar"
              placeholder="Procurar"
              autoFocus
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </section>

          {Object.entries(categories).map(([title, items]) => (
            <section key={title}>
              <section className="subtitle"><h1>{title}</h1></section>
              <section className="store">
                {filteredProducts(items)
                  .filter(p =>
                    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    p.description.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map(({ id, description, title, price, image, details }) => (
                    <article key={id}>
                      <figure className="c1xr3">
                        <a href={`/product/${id}`}>
                          <img src={image} alt={details} />
                        </a>
                      </figure>
                      <p>{description}</p>
                      <p>{title}</p>
                      <p>{price.toFixed(2)}€</p>
                    </article>
                  ))}
              </section>
            </section>
          ))}
        </main>
      </div>

      <ShoppingCart
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        onConfirm={() => {
          setCartOpen(false);
          setShowTransactionForm(true);
        }}
      />

      {showTransactionForm && (
        <div className="modal-overlay" onClick={() => setShowTransactionForm(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setShowTransactionForm(false)}>
              &times;
            </button>
            <TransactionForm onClose={() => setShowTransactionForm(false)} />
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default StorePage;
