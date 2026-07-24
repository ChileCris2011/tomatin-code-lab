import assert from "node:assert/strict";
import { beforeEach, test } from "node:test";

import { MemoryStorage } from "./helpers/memory-storage.js";

globalThis.localStorage = new MemoryStorage();

const { ensureDemoAccounts, getPublicUsers, getSession, login, logout, register } =
  await import("../js/auth.js");

beforeEach(() => {
  localStorage.clear();
});

test("demo student and admin accounts can authenticate", async () => {
  await ensureDemoAccounts();
  const users = getPublicUsers();

  assert.equal(users.length, 2);
  assert.ok(users.every((user) => !("passwordHash" in user)));

  const admin = await login("admin@tomatin.local", "mustakis42");
  assert.equal(admin.name, "eeminionn");
  assert.equal(admin.role, "admin");
  assert.deepEqual(getSession(), admin);
});

test("student registration creates a student session", async () => {
  await ensureDemoAccounts();
  const session = await register({
    email: "nueva@tomatin.local",
    name: "Nueva Semilla",
    password: "semilla123",
  });

  assert.equal(session.role, "student");
  assert.equal(session.name, "Nueva Semilla");
  assert.equal(getPublicUsers().length, 3);

  logout();
  assert.equal(getSession(), null);
});

test("invalid credentials are rejected", async () => {
  await ensureDemoAccounts();
  await assert.rejects(
    () => login("admin@tomatin.local", "incorrecta"),
    /La clave no coincide/,
  );
});

