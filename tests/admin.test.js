import assert from "node:assert/strict";
import { beforeEach, test } from "node:test";

import { MemoryStorage } from "./helpers/memory-storage.js";

globalThis.localStorage = new MemoryStorage();

const {
  applyMissionSettings,
  getAdminSettings,
  resetAdminSettings,
  updateMissionSettings,
} = await import("../js/admin.js");

beforeEach(() => {
  localStorage.clear();
});

test("admin overrides mission points and visibility", () => {
  const mission = { id: "m1", points: 100 };
  updateMissionSettings("m1", { points: 240, enabled: false });

  assert.deepEqual(applyMissionSettings(mission), {
    id: "m1",
    points: 240,
    enabled: false,
  });
  assert.deepEqual(getAdminSettings().missions.m1, {
    points: 240,
    enabled: false,
  });
});

test("admin settings can be reset", () => {
  updateMissionSettings("m1", { points: 240 });
  resetAdminSettings();
  assert.deepEqual(getAdminSettings(), { missions: {} });
});

