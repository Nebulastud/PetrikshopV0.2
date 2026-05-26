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
  navMenu.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
};

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    const open = navMenu.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });
}

const handleNavbarScroll = () => {
  navbar.classList.toggle("scrolled", window.scrollY > 16);
};

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

window.addEventListener("scroll", handleNavbarScroll);
window.addEventListener("load", () => {
  setActiveMenu();
  handleNavbarScroll();
});
