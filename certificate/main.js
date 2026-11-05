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

document.querySelectorAll("[data-open-courses]").forEach((link) => {
  link.addEventListener("click", () => {
    const disclosure = document.getElementById(link.getAttribute("data-open-courses"));
    if (disclosure instanceof HTMLDetailsElement) disclosure.open = true;
  });
});

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