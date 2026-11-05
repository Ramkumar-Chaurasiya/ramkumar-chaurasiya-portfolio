const revealItems = [...document.querySelectorAll("[data-reveal]")];
const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector("#primary-nav");

document.body.classList.add("js-ready");

if (menuToggle && primaryNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
    primaryNav.classList.toggle("is-open", !isOpen);
  });

  primaryNav.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest("a, button[data-hire-trigger]")) {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
      primaryNav.classList.remove("is-open");
    }
  });
}

if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else if ("IntersectionObserver" in window) {
  const stacks = new Map();

  revealItems.forEach((item) => {
    const stack = item.closest(".reveal-stack") || item.parentElement;
    const index = stacks.get(stack) || 0;
    stacks.set(stack, index + 1);
    item.style.setProperty("--reveal-delay", `${index * 100}ms`);
  });

  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const hireDialog = document.querySelector("#hire-dialog");
if (hireDialog instanceof HTMLDialogElement) {
  document.querySelectorAll("[data-hire-trigger]").forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      if (typeof hireDialog.showModal !== "function") return;
      event.preventDefault();
      hireDialog.showModal();
    });
  });

  const closeButton = hireDialog.querySelector(".hire-dialog-close");
  closeButton?.addEventListener("click", () => hireDialog.close());
  hireDialog.addEventListener("click", (event) => {
    if (event.target === hireDialog) hireDialog.close();
  });
}
