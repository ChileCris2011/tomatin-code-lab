const USERS_KEY = "tomatin.users.v1";
const SESSION_KEY = "tomatin.session.v1";

const demoAccounts = [
  {
    id: "admin-demo",
    email: "admin@tomatin.local",
    name: "eeminionn",
    role: "admin",
    password: "mustakis42",
  },
  {
    id: "student-demo",
    email: "demo@tomatin.local",
    name: "Tomatin Demo",
    role: "student",
    password: "tomatin123",
  },
];

function readUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) ?? [];
  } catch {
    return [];
  }
}

function writeUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

async function hashPassword(email, password) {
  const payload = new TextEncoder().encode(
    `tomatin-code-lab:${email.toLowerCase()}:${password}`,
  );
  const digest = await crypto.subtle.digest("SHA-256", payload);
  return [...new Uint8Array(digest)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function ensureDemoAccounts() {
  const users = readUsers();

  for (const demo of demoAccounts) {
    if (users.some((user) => user.email === demo.email)) continue;
    users.push({
      id: demo.id,
      email: demo.email,
      name: demo.name,
      role: demo.role,
      passwordHash: await hashPassword(demo.email, demo.password),
      createdAt: new Date().toISOString(),
      demo: true,
    });
  }

  writeUsers(users);
}

export async function login(email, password) {
  const normalizedEmail = email.trim().toLowerCase();
  const user = readUsers().find((candidate) => candidate.email === normalizedEmail);

  if (!user) {
    throw new Error("No existe una cuenta con ese correo.");
  }

  const passwordHash = await hashPassword(normalizedEmail, password);
  if (passwordHash !== user.passwordHash) {
    throw new Error("La clave no coincide.");
  }

  const session = {
    userId: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

export async function register({ email, name, password }) {
  const normalizedEmail = email.trim().toLowerCase();
  const cleanName = name.trim();
  const users = readUsers();

  if (!cleanName) {
    throw new Error("El alias no puede quedar vacio.");
  }
  if (users.some((user) => user.email === normalizedEmail)) {
    throw new Error("Ese correo ya esta registrado.");
  }

  const user = {
    id: crypto.randomUUID?.() ?? `user-${Date.now()}`,
    email: normalizedEmail,
    name: cleanName,
    role: "student",
    passwordHash: await hashPassword(normalizedEmail, password),
    createdAt: new Date().toISOString(),
    demo: false,
  };

  users.push(user);
  writeUsers(users);
  return login(normalizedEmail, password);
}

export function getSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY));
  } catch {
    return null;
  }
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
}

export function getPublicUsers() {
  return readUsers().map(({ passwordHash, ...user }) => user);
}

