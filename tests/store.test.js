import assert from "node:assert/strict";
import { beforeEach, test } from "node:test";

import { MemoryStorage } from "./helpers/memory-storage.js";

globalThis.localStorage = new MemoryStorage();

const {
  completeMission,
  getProgress,
  getRank,
  awardSecret,
  resetAllProgress,
} = await import("../js/store.js");

beforeEach(() => {
  localStorage.clear();
});

test("a mission awards XP once", () => {
  const mission = { id: "test-mission", points: 120 };
  const first = completeMission("user-1", mission);
  const second = completeMission("user-1", mission);

  assert.equal(first.awarded, 120);
  assert.equal(second.awarded, 0);
  assert.equal(second.alreadyCompleted, true);
  assert.deepEqual(getProgress("user-1").completed, ["test-mission"]);
  assert.equal(getProgress("user-1").xp, 120);
});

test("secret rewards are idempotent", () => {
  assert.equal(awardSecret("user-1", "secret", 42).awarded, 42);
  assert.equal(awardSecret("user-1", "secret", 42).awarded, 0);
  assert.equal(getProgress("user-1").xp, 42);
});

test("rank thresholds remain stable", () => {
  assert.equal(getRank(0), "Semilla");
  assert.equal(getRank(350), "Brote");
  assert.equal(getRank(1100), "Planta");
  assert.equal(getRank(2600), "Bosque");
  assert.equal(getRank(5000), "Cordillera");
});

test("progress can be reset locally", () => {
  completeMission("user-1", { id: "m1", points: 100 });
  resetAllProgress();
  assert.equal(getProgress("user-1").xp, 0);
});

