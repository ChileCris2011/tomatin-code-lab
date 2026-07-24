const ADMIN_KEY = "tomatin.admin.v1";

function readSettings() {
  try {
    return JSON.parse(localStorage.getItem(ADMIN_KEY)) ?? { missions: {} };
  } catch {
    return { missions: {} };
  }
}

function writeSettings(settings) {
  localStorage.setItem(ADMIN_KEY, JSON.stringify(settings));
}

export function applyMissionSettings(mission) {
  const settings = readSettings().missions[mission.id] ?? {};
  return {
    ...mission,
    points: settings.points ?? mission.points,
    enabled: settings.enabled ?? true,
  };
}

export function updateMissionSettings(id, patch) {
  const settings = readSettings();
  settings.missions[id] = {
    ...(settings.missions[id] ?? {}),
    ...patch,
  };
  writeSettings(settings);
  return settings.missions[id];
}

export function getAdminSettings() {
  return readSettings();
}

export function resetAdminSettings() {
  localStorage.removeItem(ADMIN_KEY);
}

