export function setupSearchFilter() {
    const searchBar = document.getElementById("searchBar");
    if (!searchBar) return;
  
    searchBar.addEventListener("input", () => {
      const filter = searchBar.value.toLowerCase();
  
      const priceArticles = document.querySelectorAll(".prices article");
      const storeArticles = document.querySelectorAll(".store article");
  
      const elementsToFilter = priceArticles.length ? [...priceArticles] : [...storeArticles];
  
      elementsToFilter.forEach((el) => {
        const text = el.textContent.toLowerCase();
        el.style.display = text.includes(filter) ? "" : "none";
      });
    });
  }
  