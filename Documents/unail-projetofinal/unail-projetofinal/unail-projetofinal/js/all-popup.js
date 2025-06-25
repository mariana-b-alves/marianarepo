export function setupAllPopup() {
  const popup = document.getElementById('allPopup');
  const popupImage = document.getElementById('allPopupImage');
  const closeBtn = document.getElementById('allPopupCloseBtn');
  const figures = document.querySelectorAll('figure img.all-img');

  if (!popup || !popupImage) {
    console.warn('Popup or popup images missing');
    return;
  }

  figures.forEach(img => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => {
      popup.style.display = 'flex';
      popupImage.src = img.src;
      popupImage.alt = img.alt;
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      popup.style.display = 'none';
    });
  } else {
    console.warn('closeBtn not found');
  }

  popup.addEventListener('click', (e) => {
    if (e.target === popup) {
      popup.style.display = 'none';
    }
  });
}
