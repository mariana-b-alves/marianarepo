export function showTransactionDone(onClose) {
  const overlay = document.getElementById('transaction-form-overlay');
  overlay.innerHTML = `
    <section class="transactionDone open">
      <article class="container-all">
        <a class="closeBtn" id="transactionDoneCloseBtn">&times;</a>

        <article class="container-this">
          <div class="centered-content">
            <i class="fa-solid fa-circle-check"></i>
            <p>A sua compra foi feita com sucesso. </p>
            <p>A sua encomenda irá ser enviada para avaliação. Será contactado por email para concluir a sua transação.</p>
          </div>

          <button class="btn" id="transactionDoneCloseBtn2">FECHAR</button>
        </article>
      </article>
    </section>
  `;
  overlay.classList.add('open');

  const btn1 = document.getElementById('transactionDoneCloseBtn');
  const btn2 = document.getElementById('transactionDoneCloseBtn2');
  if (btn1) btn1.onclick = onClose;
  if (btn2) btn2.onclick = onClose;
}
