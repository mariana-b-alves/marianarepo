import ScrollMagic from 'scrollmagic';

export function initScrollMagicArticles() {
  const controller = new ScrollMagic.Controller();
  const articles = document.querySelectorAll('.info-article');

  articles.forEach((article, i) => {
    const isLast = 
        i === articles.length - 1;

    new ScrollMagic.Scene({
      triggerElement: article,
      triggerHook: 0,
      duration: '100%',
    })
      .setPin(article, { pushFollowers: isLast })
      .addTo(controller);
  });
}
