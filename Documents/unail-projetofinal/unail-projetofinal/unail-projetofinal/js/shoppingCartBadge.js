export function updateCartBadge(count = 0) {
  try {
    const cartBadge = document.getElementById('cart-badge');
    if (!cartBadge) {
      console.warn('No cart badge element found');
      return;
    }

    cartBadge.textContent = count;

    if (count === 0 || count === '0') {
      cartBadge.style.display = 'none';
    } else {
      cartBadge.style.display = 'flex';
    }

    console.log('Cart badge updated:', count);
  } catch (error) {
    console.error('Error updating cart badge:', error);
  }
}
