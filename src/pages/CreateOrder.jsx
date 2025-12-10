import { useNavigate } from "react-router-dom";
import { createOrder } from "../services/basketApi";
import { useState } from "react";

export default function CreateOrder() {
  const nav = useNavigate();
  const [title, setTitle] = useState("");
  const [items, setItems] = useState("");

  function submit() {
    createOrder({
      id: Date.now(),
      title,
      items: items.split(","),
    });
    nav("/basket");
  }

  return (
    <div>
      <h2>Создать заказ</h2>

      <input
        placeholder="Название заказа"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <input
        placeholder="Герои (через запятую)"
        value={items}
        onChange={e => setItems(e.target.value)}
      />

      <button onClick={submit}>Сохранить</button>
    </div>
  );
}
