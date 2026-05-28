const navbar = document.getElementById("navbar");
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");
const pageKey = document.body.dataset.page;

const setActiveMenu = () => {
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.dataset.page === pageKey);
  });
};

const closeMenu = () => {
  if (!navMenu || !menuToggle) return;
  navMenu.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
};

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    const open = navMenu.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
}

const handleNavbarScroll = () => {
  if (!navbar) return;
  navbar.classList.toggle("scrolled", window.scrollY > 16);
};

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));
} else {
  document.querySelectorAll(".reveal").forEach((el) => el.classList.add("show"));
}

window.addEventListener("scroll", handleNavbarScroll);
window.addEventListener("load", () => {
  setActiveMenu();
  handleNavbarScroll();
});

const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const products = document.querySelectorAll(".product-card");

function filterProducts() {
  if (!searchInput || !categoryFilter || !products.length) return;

  const searchValue = searchInput.value.toLowerCase().trim();
  const categoryValue = categoryFilter.value;

  products.forEach((product) => {
    const title = product.querySelector("h3")?.textContent.toLowerCase() || "";
    const category = product.dataset.category;

    const matchSearch = title.includes(searchValue);
    const matchCategory = categoryValue === "all" || category === categoryValue;

    product.classList.toggle("is-hidden", !(matchSearch && matchCategory));
  });
}

if (searchInput && categoryFilter && products.length) {
  searchInput.addEventListener("input", filterProducts);
  categoryFilter.addEventListener("change", filterProducts);
}
