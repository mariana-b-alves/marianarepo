export function showTransactionErr(onClose) {
  const overlay = document.getElementById('transaction-form-overlay');
  overlay.innerHTML = `
    <section class="transactionErr open">
      <article class="container-all">
        <a class="closeBtn" id="transactionErrCloseBtn">&times;</a>

        <article class="container-this">
          <div class="centered-content">
            <i class="fa-solid fa-triangle-exclamation"></i>
            <p>Não conseguimos concluir a sua compra.</p>
            <p>Tente concluir o seu pagamento outra vez mais tarde ou tente utilizar outro meio de pagamento.</p>
          </div>

          <button class="btn" id="transactionErrCloseBtn2">FECHAR</button>
        </article>
      </article>
    </section>
  `;
  overlay.classList.add('open');

  const btn1 = document.getElementById('transactionErrCloseBtn');
  const btn2 = document.getElementById('transactionErrCloseBtn2');
  if (btn1) btn1.onclick = onClose;
  if (btn2) btn2.onclick = onClose;
}
