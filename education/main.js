const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector("#primary-nav");

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

const educationRows = document.querySelectorAll(".education-table tbody tr");
if (
  educationRows.length > 0 &&
  "IntersectionObserver" in window &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {
  const educationTableBody = educationRows[0].parentElement;
  educationTableBody?.classList.add("education-reveal-ready");

  const rowObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -32px 0px" }
  );

  educationRows.forEach((row) => rowObserver.observe(row));
}

const hireDialog = document.querySelector("#hire-dialog");
if (hireDialog instanceof HTMLDialogElement) {
  document.querySelectorAll("[data-hire-trigger]").forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      if (typeof hireDialog.showModal !== "function") {
        window.location.href = "../logo/hire_me.pdf";
        return;
      }
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