import assert from "node:assert/strict";
import test from "node:test";

import { getMissionById, getMissionsByCourse, missions } from "../js/missions.js";

test("the catalog contains ten missions per course", () => {
  assert.equal(missions.length, 20);
  assert.equal(getMissionsByCourse("programacion-1").length, 10);
  assert.equal(getMissionsByCourse("programacion-2").length, 10);
});

test("mission identifiers are unique and resolvable", () => {
  const ids = missions.map((mission) => mission.id);
  assert.equal(new Set(ids).size, ids.length);

  for (const mission of missions) {
    assert.equal(getMissionById(mission.id), mission);
  }
});

test("every mission has executable checks and complete metadata", () => {
  for (const mission of missions) {
    assert.ok(mission.title);
    assert.ok(mission.brief);
    assert.ok(mission.starterCode);
    assert.ok(mission.points > 0);
    assert.ok(mission.duration > 0);
    assert.ok(mission.tests.length >= 2);
    assert.ok(mission.objectives.length >= 3);
    assert.ok(mission.hints.length >= 2);
  }
});

