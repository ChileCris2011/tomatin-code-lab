const viewLabels = {
  dashboard: "base",
  missions: "misiones",
  lab: "laboratorio",
  ranking: "ranking",
  admin: "admin",
};

const sidebar = document.querySelector(".sidebar");
const currentViewLabel = document.querySelector("#current-view-label");

function refreshIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function showView(name) {
  const target = document.querySelector(`[data-view="${name}"]`);
  if (!target) return;

  document.querySelectorAll(".view").forEach((view) => {
    view.classList.toggle("is-active", view === target);
  });

  document.querySelectorAll(".nav-item").forEach((item) => {
    item.classList.toggle("is-active", item.dataset.viewTarget === name);
  });

  currentViewLabel.textContent = viewLabels[name] ?? name;
  sidebar.classList.remove("is-open");
  document.querySelector("#main-content").focus({ preventScroll: true });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelectorAll("[data-view-target]").forEach((trigger) => {
  trigger.addEventListener("click", () => showView(trigger.dataset.viewTarget));
});

document.querySelector("#mobile-menu").addEventListener("click", () => {
  sidebar.classList.toggle("is-open");
});

document.addEventListener("click", (event) => {
  if (
    window.innerWidth <= 720 &&
    sidebar.classList.contains("is-open") &&
    !sidebar.contains(event.target) &&
    !event.target.closest("#mobile-menu")
  ) {
    sidebar.classList.remove("is-open");
  }
});

document.addEventListener("DOMContentLoaded", refreshIcons);
window.addEventListener("load", refreshIcons);

export { refreshIcons, showView };

