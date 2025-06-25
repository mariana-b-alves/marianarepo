export function setupSideNav() {
  const openBtn = document.getElementById("openBtn");
  const closeBtn = document.getElementById("closeBtn");
  const sideNav = document.getElementById("sideMenu");
  const overlay = document.getElementById("overlay");

  openBtn.addEventListener("click", () => {
    sideNav.classList.add("open");
    overlay.classList.add("active");
  });

  closeBtn.addEventListener("click", closeSideNav);
  overlay.addEventListener("click", closeSideNav);

  function closeSideNav() {
    sideNav.classList.remove("open");
    overlay.classList.remove("active");
  }
}
