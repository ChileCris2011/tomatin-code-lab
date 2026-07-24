const PROGRESS_KEY = "tomatin.progress.v1";

function readDatabase() {
  try {
    return JSON.parse(localStorage.getItem(PROGRESS_KEY)) ?? {};
  } catch {
    return {};
  }
}

function writeDatabase(database) {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(database));
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function previousDayKey() {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return date.toISOString().slice(0, 10);
}

export function getProgress(userId) {
  if (!userId) {
    return {
      completed: [],
      xp: 0,
      streak: 0,
      lastActiveDate: null,
      secrets: [],
    };
  }

  const database = readDatabase();
  return (
    database[userId] ?? {
      completed: [],
      xp: 0,
      streak: 0,
      lastActiveDate: null,
      secrets: [],
    }
  );
}

export function completeMission(userId, mission) {
  const database = readDatabase();
  const progress = getProgress(userId);

  if (progress.completed.includes(mission.id)) {
    return { progress, awarded: 0, alreadyCompleted: true };
  }

  const today = todayKey();
  const streak =
    progress.lastActiveDate === today
      ? progress.streak
      : progress.lastActiveDate === previousDayKey()
        ? progress.streak + 1
        : 1;

  const nextProgress = {
    ...progress,
    completed: [...progress.completed, mission.id],
    xp: progress.xp + mission.points,
    streak,
    lastActiveDate: today,
  };

  database[userId] = nextProgress;
  writeDatabase(database);

  return {
    progress: nextProgress,
    awarded: mission.points,
    alreadyCompleted: false,
  };
}

export function awardSecret(userId, secretId, points) {
  const database = readDatabase();
  const progress = getProgress(userId);

  if (progress.secrets.includes(secretId)) {
    return { progress, awarded: 0 };
  }

  const nextProgress = {
    ...progress,
    secrets: [...progress.secrets, secretId],
    xp: progress.xp + points,
  };
  database[userId] = nextProgress;
  writeDatabase(database);
  return { progress: nextProgress, awarded: points };
}

export function getRank(xp) {
  if (xp >= 5000) return "Cordillera";
  if (xp >= 2600) return "Bosque";
  if (xp >= 1100) return "Planta";
  if (xp >= 350) return "Brote";
  return "Semilla";
}

export function getAllProgress() {
  return readDatabase();
}

