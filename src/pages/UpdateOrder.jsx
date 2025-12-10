import { useNavigate, useParams } from "react-router-dom";
import { getOrderById, updateOrder } from "../services/basketApi";
import { useState } from "react";

export default function UpdateOrder() {
  const { id } = useParams();
  const nav = useNavigate();
  const order = getOrderById(Number(id));

  const [title, setTitle] = useState(order?.title || "");
  const [items, setItems] = useState(order?.items.join(",") || "");

  function submit() {
    updateOrder(Number(id), {
      title,
      items: items.split(","),
    });
    nav("/basket");
  }

  return (
    <div>
      <h2>Редактировать заказ</h2>

      <input value={title} onChange={e => setTitle(e.target.value)} />
      <input value={items} onChange={e => setItems(e.target.value)} />

      <button onClick={submit}>Обновить</button>
    </div>
  );
}
