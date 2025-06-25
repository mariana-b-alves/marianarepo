import React from 'react';
import '../../css/form.css';

const TransactionErr = ({ onClose }) => {
  const handleClose = (e) => {
    e.stopPropagation();
    onClose(); 
  };

  return (
    <section className="transactionErr open" onClick={onClose}>
      <article className="container-all">
        <a className="closeBtn" onClick={handleClose}>&times;</a>

        <article className="container-this">
          <div className="centered-content">
            <i className="fa-solid fa-triangle-exclamation"></i>
            <p>Não conseguimos concluir a sua compra. </p>
            <p>Tente concluir o seu pagamento outra vez mais tarde or tente utilizar outro meio de pagamento.</p>
          </div>

          <button className="btn" id="tryAgainBtn" onClick={handleClose}>FECHAR</button>
        </article>
      </article>
    </section>
  );
};

export default TransactionErr;
