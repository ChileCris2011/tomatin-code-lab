import { getMissionById, getMissionsByCourse, missions } from "./missions.js";
import { runCode } from "./runner.js";
import {
  ensureDemoAccounts,
  getSession,
  login,
  logout,
  register,
} from "./auth.js";
import { completeMission, getProgress, getRank } from "./store.js";

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
const codeEditor = document.querySelector("#code-editor");
const consoleOutput = document.querySelector("#console-output");
const runButton = document.querySelector("#run-code");
const authDialog = document.querySelector("#auth-dialog");
const authForm = document.querySelector("#auth-form");
const authFields = document.querySelector("#auth-fields");
const sessionPanel = document.querySelector("#session-panel");
let currentSession = getSession();
let authMode = "login";

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
  const completed = new Set(getProgress(currentSession?.userId).completed);

  missionGrid.innerHTML = visibleMissions
    .map(
      (mission) => `
        <article class="mission-card ${completed.has(mission.id) ? "is-complete" : ""}">
          <div class="mission-card-topline">
            <span>${mission.courseLabel}</span>
            <strong>${completed.has(mission.id) ? "COMPLETA" : `+${mission.points} XP`}</strong>
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
            ${completed.has(mission.id) ? "Repetir mision" : "Ver briefing"}
            <i data-lucide="arrow-up-right" aria-hidden="true"></i>
          </button>
        </article>
      `,
    )
    .join("");

  refreshIcons();
}

function renderNextMission() {
  const completed = new Set(getProgress(currentSession?.userId).completed);
  const mission = missions.find((item) => !completed.has(item.id)) ?? missions[0];
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

  document.querySelector("#completed-count").textContent =
    `${completed.size}/${missions.length}`;
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

async function executeLabCode() {
  const mission = getMissionById(codeEditor.dataset.missionId);
  runButton.disabled = true;
  consoleOutput.textContent = "$ ejecutando proceso aislado...";

  const result = await runCode(codeEditor.value, mission?.tests ?? []);
  const lines = [];

  if (result.logs.length) {
    lines.push(...result.logs.map((line) => `> ${line}`), "");
  }

  if (!result.ok) {
    lines.push(`[ERROR] ${result.error}`);
  } else if (!mission) {
    lines.push("[OK] proceso terminado sin errores");
  } else {
    lines.push(`PRUEBAS // ${mission.title}`);
    result.tests.forEach((test) => {
      lines.push(`${test.passed ? "[PASS]" : "[FAIL]"} ${test.name}`);
    });

    const passed = result.tests.length > 0 && result.tests.every((test) => test.passed);
    if (passed) {
      lines.push("", `[MISION COMPLETA] +${mission.points} XP disponibles`);
      document.dispatchEvent(
        new CustomEvent("mission:passed", { detail: { mission } }),
      );
    } else {
      lines.push("", "[PENDIENTE] Revisa el briefing o pide una pista.");
    }
  }

  consoleOutput.textContent = lines.join("\n") || "[OK] sin salida";
  runButton.disabled = false;
}

function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.querySelector("#toast-region").append(toast);
  window.setTimeout(() => toast.remove(), 4200);
}

function renderAccount() {
  const progress = getProgress(currentSession?.userId);
  const percentage = Math.round((progress.completed.length / missions.length) * 100);
  const profileName = document.querySelector("#profile-name");
  const profileRole = document.querySelector("#profile-role");
  const avatar = document.querySelector(".avatar");

  profileName.textContent = currentSession?.name ?? "Invitado";
  profileRole.textContent = currentSession?.role ?? "sin sesion";
  avatar.textContent = (currentSession?.name ?? "?").slice(0, 1).toUpperCase();
  document.querySelector("#xp-total").textContent = progress.xp;
  document.querySelector("#streak-count").textContent = progress.streak;
  document.querySelector("#rank-label").textContent = getRank(progress.xp);
  document.querySelector("#completed-count").textContent =
    `${progress.completed.length}/${missions.length}`;
  document.querySelector(".hero-signal small").textContent =
    `${percentage}% sincronizado`;
  document.querySelectorAll(".admin-only").forEach((item) => {
    item.hidden = currentSession?.role !== "admin";
  });

  renderMissionGrid(
    document.querySelector("[data-course-filter].is-active")?.dataset.courseFilter ??
      "all",
  );
  renderNextMission();
}

function setAuthMode(mode) {
  authMode = mode;
  const isRegister = mode === "register";

  document.querySelectorAll("[data-auth-mode]").forEach((tab) => {
    tab.classList.toggle("is-active", tab.dataset.authMode === mode);
  });
  document.querySelector("#name-field").hidden = !isRegister;
  document.querySelector("#auth-name").required = isRegister;
  document.querySelector("#auth-password").autocomplete = isRegister
    ? "new-password"
    : "current-password";
  document.querySelector("#auth-submit-label").textContent = isRegister
    ? "Crear cuenta"
    : "Conectar";
  document.querySelector("#auth-error").textContent = "";
}

function openAccountDialog() {
  const hasSession = Boolean(currentSession);
  authFields.hidden = hasSession;
  sessionPanel.hidden = !hasSession;

  if (hasSession) {
    document.querySelector("#session-avatar").textContent =
      currentSession.name.slice(0, 1).toUpperCase();
    document.querySelector("#session-name").textContent = currentSession.name;
    document.querySelector("#session-email").textContent = currentSession.email;
    document.querySelector("#session-role").textContent = currentSession.role;
  } else {
    authForm.reset();
    setAuthMode("login");
  }

  authDialog.showModal();
  refreshIcons();
}

document.querySelectorAll("[data-view-target]").forEach((trigger) => {
  trigger.addEventListener("click", () => showView(trigger.dataset.viewTarget));
});

document.querySelector("#mobile-menu").addEventListener("click", () => {
  sidebar.classList.toggle("is-open");
});

runButton.addEventListener("click", executeLabCode);
document.querySelector("#clear-console").addEventListener("click", () => {
  consoleOutput.textContent = "$ consola limpia";
});

document.querySelector("#auth-trigger").addEventListener("click", openAccountDialog);
document.querySelector("#auth-close").addEventListener("click", () => {
  authDialog.close();
});

document.querySelector(".auth-tabs").addEventListener("click", (event) => {
  const tab = event.target.closest("[data-auth-mode]");
  if (tab) setAuthMode(tab.dataset.authMode);
});

authForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const email = document.querySelector("#auth-email").value;
  const password = document.querySelector("#auth-password").value;
  const error = document.querySelector("#auth-error");
  error.textContent = "";

  try {
    currentSession =
      authMode === "register"
        ? await register({
            email,
            password,
            name: document.querySelector("#auth-name").value,
          })
        : await login(email, password);
    authDialog.close();
    renderAccount();
    showToast(`Sesion conectada: ${currentSession.name}`);
  } catch (authError) {
    error.textContent = authError.message;
  }
});

document.querySelector("#logout-button").addEventListener("click", () => {
  logout();
  currentSession = null;
  authDialog.close();
  if (document.querySelector("#admin-view").classList.contains("is-active")) {
    showView("dashboard");
  }
  renderAccount();
  showToast("Sesion cerrada.");
});

document.addEventListener("mission:passed", ({ detail: { mission } }) => {
  if (!currentSession) {
    showToast("Mision superada. Inicia sesion para guardar el puntaje.");
    return;
  }

  const result = completeMission(currentSession.userId, mission);
  renderAccount();
  showToast(
    result.alreadyCompleted
      ? "Mision repetida: el XP ya estaba registrado."
      : `Mision completada: +${result.awarded} XP`,
  );
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

document.addEventListener("DOMContentLoaded", async () => {
  await ensureDemoAccounts();
  renderMissionGrid();
  renderNextMission();
  renderAccount();
  refreshIcons();
});
window.addEventListener("load", refreshIcons);

export { refreshIcons, showView };
