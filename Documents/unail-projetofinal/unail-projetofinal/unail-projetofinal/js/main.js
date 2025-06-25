import { setupSideNav } from './sidemenu_popup.js';
import { setupAllPopup } from './all-popup.js';
import { setupSearchFilter } from './searchFilter.js';
import { renderCartContents } from './cartSummary.js';
import { updateCartBadge } from './shoppingCartBadge.js';
import { showTransactionDone } from './transactionDone.js';
import { showTransactionErr } from './transactionErr.js';
import { initScrollMagicArticles } from './scrollMagic.js';

async function loadProductData() {
  try {
    const res = await fetch('/js/data/productData.json');
    if (!res.ok) throw new Error('Failed to load product data');
    window.productData = await res.json();
  } catch (err) {
    console.error('Error loading product data:', err);
    window.productData = [];
  }
}

function syncCartBadgeFromLocalStorage() {
  try {
    const cart = JSON.parse(localStorage.getItem('cartItems')) || [];
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    updateCartBadge(count);
  } catch (error) {
    console.error('Failed to sync cart badge from localStorage:', error);
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  await loadProductData();

  setupSideNav();
  setupAllPopup();
  setupSearchFilter();
  updateCartBadge();
  syncCartBadgeFromLocalStorage();
  initScrollMagicArticles();


  const cartIcon = document.querySelector('.shopping-cart-icon');
  const cartContainer = document.getElementById('cart-summary');
  const cartOverlay = document.getElementById('cart-overlay');
  const transactionFormPopup = document.getElementById('transactionFormPopup');
  const cancelBtn = document.getElementById('cancelBtn');
  const closeBtns = document.querySelectorAll('#transactionFormPopup .closeBtn');

  function openCart() {
    if (!cartContainer || !cartOverlay) return;
    cartContainer.classList.add('open');
    cartOverlay.classList.add('active');
    renderCartContents();
    syncCartBadgeFromLocalStorage();
  }

  function closeCart() {
    if (!cartContainer || !cartOverlay) return;
    cartContainer.classList.remove('open');
    cartOverlay.classList.remove('active');
  }

  function closeTransactionOverlay() {
    const overlay = document.getElementById('transaction-form-overlay');
    if (!overlay) return;
    overlay.classList.remove('open');
    overlay.innerHTML = '';
  }

  if (cartIcon) {
    cartIcon.addEventListener('click', () => {
      if (!cartContainer) return;
      if (cartContainer.classList.contains('open')) {
        closeCart();
      } else {
        openCart();
      }
    });
  }

  if (cartOverlay) {
    cartOverlay.addEventListener('click', closeCart);
  }

  if (cancelBtn && transactionFormPopup) {
    cancelBtn.addEventListener('click', () => {
      transactionFormPopup.classList.remove('active');
    });
  }

  if (closeBtns.length && transactionFormPopup) {
    closeBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        transactionFormPopup.classList.remove('active');
      });
    });
  }

  window.openTransactionForm = function () {
    if (transactionFormPopup) transactionFormPopup.classList.add('active');
  };

  const form = document.querySelector('#transactionFormPopup form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const customer = {};
      formData.forEach((value, key) => {
        customer[key] = value;
      });

      const cart = JSON.parse(localStorage.getItem('cartItems')) || [];
      const productData = window.productData || [];

      // Map cart items with product details by finding product in array
      const cartWithDetails = cart.map((item) => {
        const product = productData.find((p) => p.id === item.id) || {};
        return {
          ...item,
          title: product.title || '',
          description: product.description || '',
          image: product.image || '',
          price: product.price || 0,
        };
      });

      const total = cartWithDetails.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      const payload = {
        customer,
        cart: cartWithDetails,
        total: total.toFixed(2),
      };

      fetch('https://localhost:3000/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
        .then((res) => {
          if (res.ok) {
            localStorage.removeItem('cartItems');
            renderCartContents();
            syncCartBadgeFromLocalStorage();
            showTransactionDone(closeTransactionOverlay);
          } else {
            showTransactionErr(closeTransactionOverlay);
          }
        })
        .catch(() => {
          showTransactionErr(closeTransactionOverlay);
        });
    });
  }
});
