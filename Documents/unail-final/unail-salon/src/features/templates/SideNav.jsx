import { Link } from 'react-router-dom';

const SideNav = ({ isOpen, onClose }) => (
  <>
    <section className={`overlay ${isOpen ? 'active' : ''}`} onClick={onClose}></section>
    <section className={`sideNav ${isOpen ? 'open' : ''}`}>
      <article>
        <a className="closeBtn" onClick={onClose}>&times;</a>
        <Link to="/portfolio">PORTEFÓLIO</Link>
        <Link to="/prices">PREÇÁRIO</Link>
        <Link to="/store">LOJA</Link>
        <Link to="/contacts">CONTACTOS</Link>
      </article>
    </section>
  </>
);

export default SideNav;
