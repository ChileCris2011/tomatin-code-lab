import { getMissionById, getMissionsByCourse, missions } from "./missions.js";

const viewLabels = {
  dashboard: "base",
  missions: "misiones",
  lab: "laboratorio",
  ranking: "ranking",
  admin: "admin",
};

const sidebar = document.querySelector(".sidebar");
const currentViewLabel = document.querySelector("#current-view-label");
const missionGrid = document.querySelector("#mission-grid");
const missionDialog = document.querySelector("#mission-dialog");
const missionContent = document.querySelector("#mission-content");

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

function renderMissionGrid(course = "all") {
  const visibleMissions = getMissionsByCourse(course);

  missionGrid.innerHTML = visibleMissions
    .map(
      (mission) => `
        <article class="mission-card">
          <div class="mission-card-topline">
            <span>${mission.courseLabel}</span>
            <strong>+${mission.points} XP</strong>
          </div>
          <div class="mission-index" aria-hidden="true">${String(mission.order).padStart(2, "0")}</div>
          <p class="mission-module">${mission.module}</p>
          <h2>${mission.title}</h2>
          <p>${mission.subtitle}</p>
          <div class="mission-meta" aria-label="Detalles de la mision">
            <span><i data-lucide="signal" aria-hidden="true"></i>${mission.difficulty}</span>
            <span><i data-lucide="clock-3" aria-hidden="true"></i>${mission.duration} min</span>
          </div>
          <button class="mission-open" type="button" data-mission-open="${mission.id}">
            Ver briefing
            <i data-lucide="arrow-up-right" aria-hidden="true"></i>
          </button>
        </article>
      `,
    )
    .join("");

  refreshIcons();
}

function renderNextMission() {
  const mission = missions[0];
  const target = document.querySelector("#next-mission");

  target.className = "next-mission";
  target.innerHTML = `
    <div>
      <span>${mission.module} // ${String(mission.order).padStart(2, "0")}</span>
      <h3>${mission.title}</h3>
      <p>${mission.subtitle}</p>
    </div>
    <button
      class="icon-button"
      type="button"
      data-mission-open="${mission.id}"
      aria-label="Abrir ${mission.title}"
      title="Abrir mision"
    >
      <i data-lucide="arrow-right" aria-hidden="true"></i>
    </button>
  `;

  document.querySelector("#completed-count").textContent = `0/${missions.length}`;
  refreshIcons();
}

function openMission(id) {
  const mission = getMissionById(id);
  if (!mission) return;

  missionContent.innerHTML = `
    <header class="modal-header">
      <div>
        <p class="eyebrow">${mission.courseLabel} // MISION ${String(mission.order).padStart(2, "0")}</p>
        <h2>${mission.title}</h2>
        <p class="mission-lead">${mission.story}</p>
      </div>
      <button
        class="icon-button"
        type="button"
        data-close-dialog
        aria-label="Cerrar"
        title="Cerrar"
      >
        <i data-lucide="x" aria-hidden="true"></i>
      </button>
    </header>
    <div class="mission-brief">
      <section>
        <h3>Briefing</h3>
        <p>${mission.brief}</p>
      </section>
      <section>
        <h3>Objetivos</h3>
        <ul>
          ${mission.objectives.map((objective) => `<li>${objective}</li>`).join("")}
        </ul>
      </section>
    </div>
    <section class="starter-preview" aria-labelledby="starter-title">
      <div class="code-titlebar">
        <span id="starter-title">starter.js</span>
        <span>${mission.duration} min // +${mission.points} XP</span>
      </div>
      <pre><code>${escapeHtml(mission.starterCode)}</code></pre>
    </section>
    <div class="mission-dialog-actions">
      <button class="secondary-button" type="button" data-hint-toggle>
        <i data-lucide="lightbulb" aria-hidden="true"></i>
        Ver pista
      </button>
      <button class="primary-button" type="button" data-start-mission="${mission.id}">
        <i data-lucide="terminal" aria-hidden="true"></i>
        Resolver en laboratorio
      </button>
    </div>
    <p class="hint-box" data-hint-box hidden>${mission.hints[0]}</p>
  `;

  missionDialog.showModal();
  refreshIcons();
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

document.querySelectorAll("[data-view-target]").forEach((trigger) => {
  trigger.addEventListener("click", () => showView(trigger.dataset.viewTarget));
});

document.querySelector("#mobile-menu").addEventListener("click", () => {
  sidebar.classList.toggle("is-open");
});

document.querySelector(".filter-bar").addEventListener("click", (event) => {
  const filter = event.target.closest("[data-course-filter]");
  if (!filter) return;

  document.querySelectorAll("[data-course-filter]").forEach((item) => {
    item.classList.toggle("is-active", item === filter);
  });
  renderMissionGrid(filter.dataset.courseFilter);
});

document.addEventListener("click", (event) => {
  const missionTrigger = event.target.closest("[data-mission-open]");
  if (missionTrigger) {
    openMission(missionTrigger.dataset.missionOpen);
    return;
  }

  if (event.target.closest("[data-close-dialog]")) {
    missionDialog.close();
    return;
  }

  const hintTrigger = event.target.closest("[data-hint-toggle]");
  if (hintTrigger) {
    const hintBox = missionContent.querySelector("[data-hint-box]");
    hintBox.hidden = !hintBox.hidden;
    hintTrigger.classList.toggle("is-active", !hintBox.hidden);
    return;
  }

  const startTrigger = event.target.closest("[data-start-mission]");
  if (startTrigger) {
    const mission = getMissionById(startTrigger.dataset.startMission);
    document.querySelector("#code-editor").value = mission.starterCode;
    document.querySelector("#code-editor").dataset.missionId = mission.id;
    missionDialog.close();
    showView("lab");
  }
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

document.addEventListener("DOMContentLoaded", () => {
  renderMissionGrid();
  renderNextMission();
  refreshIcons();
});
window.addEventListener("load", refreshIcons);

export { refreshIcons, showView };
