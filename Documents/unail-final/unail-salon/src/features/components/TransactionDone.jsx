import React from 'react';
import '../../../public/css/form.css';

/*SAME AS JS*/
const TransactionDone = ({ onClose }) => {
  return (
    <section className="transactionDone open" onClick={onClose}>
      <article className="container-all">

        <article className="container-content">
          <div className="content">
            <i className="fa-regular fa-circle-check"></i>
            <p>A sua compra foi feita com sucesso. </p>
            <p>A sua encomenda irá ser enviada para avaliação. Será contactado por email para concluir a sua transação.</p>
          </div>
          <button className="btn" id="transactionErrCloseBtn" onClick={onClose}>FECHAR</button>
        </article>
      </article>
    </section>
  );
};

export default TransactionDone;
