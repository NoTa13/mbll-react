const KEY = "mlbb_favorite_heroes";

function loadIds() {
  try {
    const raw = localStorage.getItem(KEY);
    const data = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(data)) return [];
    return Array.from(
      new Set(
        data
          .map(v => Number(v))
          .filter(v => Number.isFinite(v) && v > 0),
      ),
    ).sort((a, b) => a - b);
  } catch {
    return [];
  }
}

function saveIds(ids) {
  localStorage.setItem(KEY, JSON.stringify(ids));
}

export function getFavoriteHeroIds() {
  return loadIds();
}

export function toggleFavoriteHeroId(heroId) {
  const id = Number(heroId);
  if (!Number.isFinite(id) || id <= 0) return loadIds();

  const ids = loadIds();
  const exists = ids.includes(id);
  const next = exists ? ids.filter(v => v !== id) : [...ids, id].sort((a, b) => a - b);
  saveIds(next);
  return next;
}

