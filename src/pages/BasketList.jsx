import { Link } from "react-router-dom";
import { getOrders, deleteOrder } from "../services/basketApi";
import { useState } from "react";

export default function BasketList() {
  const [orders, setOrders] = useState(getOrders());

  function remove(id) {
    deleteOrder(id);
    setOrders(getOrders());
  }

  return (
    <div>
      <h2>Корзина заказов</h2>
      <Link to="/order/create">➕ Создать заказ</Link>

      {orders.length === 0 && <p>Корзина пуста</p>}

      {orders.map(o => (
        <div key={o.id} className="card">
          <h3>{o.title}</h3>
          <p>{o.items.length} героев</p>

          <Link to={`/basket/${o.id}`}>Подробнее</Link>{" "}
          <Link to={`/order/update/${o.id}`}>✏️</Link>{" "}
          <button onClick={() => remove(o.id)}>🗑</button>
        </div>
      ))}
    </div>
  );
}
