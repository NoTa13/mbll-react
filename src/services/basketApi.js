const KEY = "mlbb_orders";

function safeJsonParse(raw) {
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function load() {
  const raw = localStorage.getItem(KEY);
  const data = raw ? safeJsonParse(raw) : [];
  if (!Array.isArray(data)) return [];

  return data
    .map(normalizeOrder)
    .filter(Boolean)
    .slice()
    .sort(sortOrders);
}

function save(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

function normalizeStatus(status) {
  if (status === "pending" || status === "accepted") return status;
  return "pending";
}

function normalizeOrder(raw) {
  if (!raw || typeof raw !== "object") return null;

  const id = Number(raw.id);
  if (!Number.isFinite(id)) return null;

  const heroId = Number(raw.heroId);
  const createdAt = Number(raw.createdAt ?? id);
  const updatedAt = Number(raw.updatedAt ?? createdAt);
  const qty = Math.max(1, Math.floor(Number(raw.qty ?? 1)));
  const status = normalizeStatus(raw.status);

  const heroName = String(raw.heroName ?? raw.title ?? "").trim();
  const heroRole = String(raw.heroRole ?? "").trim();
  const heroImage = String(raw.heroImage ?? "").trim();

  return {
    id,
    heroId: Number.isFinite(heroId) && heroId > 0 ? heroId : 0,
    heroName,
    heroRole,
    heroImage,
    qty,
    status,
    createdAt: Number.isFinite(createdAt) ? createdAt : id,
    updatedAt: Number.isFinite(updatedAt) ? updatedAt : createdAt,
    acceptedAt: status === "accepted" ? Number(raw.acceptedAt ?? updatedAt) : null,
  };
}

function sortOrders(a, b) {
  const prio = status => (status === "pending" ? 0 : 1);
  const byStatus = prio(a.status) - prio(b.status);
  if (byStatus !== 0) return byStatus;
  return (Number(b.createdAt) || 0) - (Number(a.createdAt) || 0);
}

// CREATE from hero card
export function createOrderFromHero(hero) {
  const now = Date.now();
  const heroId = Number(hero?.id);

  const orderHero = {
    heroId: Number.isFinite(heroId) && heroId > 0 ? heroId : 0,
    heroName: String(hero?.name ?? "").trim(),
    heroRole: String(hero?.role ?? "").trim(),
    heroImage: String(hero?.image ?? "").trim(),
  };

  const orders = load();
  const idx = orders.findIndex(o => o.status === "pending" && o.heroId === orderHero.heroId);

  if (idx >= 0 && orderHero.heroId) {
    const current = orders[idx];
    const updated = {
      ...current,
      qty: Math.min(999, (current.qty || 1) + 1),
      updatedAt: now,
    };
    orders[idx] = updated;
    save(orders);
    return updated;
  }

  const created = normalizeOrder({
    id: now,
    ...orderHero,
    qty: 1,
    status: "pending",
    createdAt: now,
    updatedAt: now,
  });
  const next = [...orders, created].filter(Boolean);
  save(next);
  return created;
}

// Legacy CREATE (kept for compatibility)
export function createOrder(order) {
  if (order?.heroId || order?.heroName) {
    return createOrderFromHero({
      id: order.heroId,
      name: order.heroName,
      role: order.heroRole,
      image: order.heroImage,
    });
  }

  const now = Date.now();
  const created = normalizeOrder({
    id: typeof order?.id === "number" ? order.id : now,
    heroId: 0,
    heroName: String(order?.title ?? "Заказ").trim(),
    heroRole: "",
    heroImage: "",
    qty: 1,
    status: "pending",
    createdAt: now,
    updatedAt: now,
  });

  const next = [...load(), created].filter(Boolean);
  save(next);
  return created;
}

// READ
export function getOrders() {
  return load();
}

export function getOrderById(id) {
  return load().find(o => o.id === id) || null;
}

// UPDATE (used for accept)
export function updateOrder(id, newData) {
  const now = Date.now();
  let updated = null;

  const next = load().map(o => {
    if (o.id !== id) return o;

    const status = newData?.status ? normalizeStatus(newData.status) : o.status;
    updated = {
      ...o,
      ...newData,
      status,
      qty: Math.max(1, Math.floor(Number(newData?.qty ?? o.qty ?? 1))),
      heroName: String(newData?.heroName ?? o.heroName ?? "").trim(),
      heroRole: String(newData?.heroRole ?? o.heroRole ?? "").trim(),
      heroImage: String(newData?.heroImage ?? o.heroImage ?? "").trim(),
      updatedAt: now,
      acceptedAt:
        status === "accepted"
          ? Number(newData?.acceptedAt ?? now)
          : null,
    };
    return updated;
  });

  save(next);
  return updated;
}

export function acceptOrder(id) {
  const order = getOrderById(id);
  if (!order || order.status !== "pending") return order;
  return updateOrder(id, { status: "accepted", acceptedAt: Date.now() });
}

// DELETE (cancel)
export function deleteOrder(id) {
  const current = load();
  const next = current.filter(o => o.id !== id);
  save(next);
  return next.length !== current.length;
}

