const AUTH_KEY = "mlbb_auth";

export const DEMO_USERNAME = "salim";
export const DEMO_PASSWORD = "123123";

function safeJsonParse(raw) {
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function getAuthUser() {
  const raw = localStorage.getItem(AUTH_KEY);
  if (!raw) return null;
  const data = safeJsonParse(raw);
  if (!data || typeof data !== "object") return null;
  if (data.user !== DEMO_USERNAME) return null;
  return DEMO_USERNAME;
}

export function login(username, password) {
  if (username !== DEMO_USERNAME || password !== DEMO_PASSWORD) {
    return { ok: false, error: "Неверный логин или пароль" };
  }

  localStorage.setItem(
    AUTH_KEY,
    JSON.stringify({ user: DEMO_USERNAME, at: Date.now() }),
  );
  return { ok: true, user: DEMO_USERNAME };
}

export function logout() {
  localStorage.removeItem(AUTH_KEY);
}

