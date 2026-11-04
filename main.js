const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector("#primary-nav");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("main section[id]");

if (menuToggle && primaryNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
    primaryNav.classList.toggle("is-open", !isOpen);
  });

  primaryNav.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest("a")) {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
      primaryNav.classList.remove("is-open");
    }
  });
}

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      navLinks.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    }
  }, { rootMargin: "-30% 0px -60% 0px" });

  sections.forEach((section) => sectionObserver.observe(section));

  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.12 });

    document.querySelectorAll(
      ".section .section-heading, .skill-card, .empty-project, .timeline-card, .activity-card, .contact-card",
    ).forEach((element) => {
      element.classList.add("motion-reveal");
      revealObserver.observe(element);
    });
  }
}

const currentYear = document.querySelector("#current-year");
if (currentYear) currentYear.textContent = String(new Date().getFullYear());

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