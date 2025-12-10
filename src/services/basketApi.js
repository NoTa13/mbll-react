const KEY = "mlbb_orders";

function load() {
  return JSON.parse(localStorage.getItem(KEY)) || [];
}

function save(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

// CREATE
export function createOrder(order) {
  const orders = load();
  orders.push(order);
  save(orders);
}

// READ
export function getOrders() {
  return load();
}

export function getOrderById(id) {
  return load().find(o => o.id === id);
}

// UPDATE
export function updateOrder(id, newData) {
  const orders = load().map(o =>
    o.id === id ? { ...o, ...newData } : o
  );
  save(orders);
}

// DELETE
export function deleteOrder(id) {
  save(load().filter(o => o.id !== id));
}
