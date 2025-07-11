import React from 'react';
import '../../../public/css/form.css';

/*SAME AS JS*/
const TransactionErr = ({ onClose }) => {
  return (
    <section className="transactionErr open" onClick={onClose}>
      <article className="container-all">

        <article className="container-this">
          <div className="centered-content">
            <i className="fa-solid fa-triangle-exclamation"></i>
            <p>Não conseguimos concluir a sua compra. </p>
            <p>Tente outra vez mais tarde ou tente utilizar outro meio de pagamento.</p>
          </div>

          <button className="btn" id="transactionErrCloseBtn" onClick={handleClose}>FECHAR</button>
        </article>
      </article>
    </section>
  );
};

export default TransactionErr;
