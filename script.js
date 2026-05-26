// Navigasi antar section + status active menu
const navLinks = document.querySelectorAll(".nav-link, .logo, [data-target]");
const sections = document.querySelectorAll(".page-section");
const navbar = document.getElementById("navbar");
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

const closeMenu = () => {
  navMenu.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
};

menuToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.dataset.target;
    if (!targetId) return;

    event.preventDefault();
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
      closeMenu();
    }
  });
});

// Active link saat scroll
const setActiveLink = () => {
  let current = "home";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 130;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.toggle("active", link.dataset.target === current);
  });
};

// Navbar style berubah saat discroll
const handleNavbarScroll = () => {
  navbar.classList.toggle("scrolled", window.scrollY > 20);
};

// Animasi reveal saat card/section muncul
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  {
    threshold: 0.15,
  }
);

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

window.addEventListener("scroll", () => {
  setActiveLink();
  handleNavbarScroll();
});

window.addEventListener("load", () => {
  setActiveLink();
  handleNavbarScroll();
});
