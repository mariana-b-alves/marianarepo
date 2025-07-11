import { Link } from 'react-router-dom';

const Header = ({ totalItems, onCartClick, onMenuClick }) => (
  <header>
    <figure>
      <Link to="/">
        <img src="/img/unail-logo.png" alt="Logo da U Nail" />
      </Link>
    </figure>
    <nav>
      <ul>
        <li><Link to="/portfolio">PORTEFÓLIO</Link></li>
        <li><Link to="/prices">PREÇÁRIO</Link></li>
        <li><Link to="/store">LOJA</Link></li>
        <li><Link to="/contacts">CONTACTOS</Link></li>
      </ul>
      <div className="nav-icons">
        <div className="cart-icon-container" onClick={onCartClick}>
          <span className="material-symbols-outlined shopping-cart-icon">shopping_cart</span>
          {totalItems > 0 && (
            <span className="shopping-cart-badge" id="cart-badge">{totalItems}</span>
          )}
        </div>
        <div className="hamburger" onClick={onMenuClick}>&#9776;</div>
      </div>
    </nav>
  </header>

);

export default Header;
