import React, { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getOrderById, updateOrder } from "../services/basketApi";

export default function UpdateOrder() {
  const { id } = useParams();
  const nav = useNavigate();
  const orderId = Number(id);
  const order = getOrderById(orderId);

  const [title, setTitle] = useState(order?.title ?? "");
  const [itemsText, setItemsText] = useState(order?.items?.join("\n") ?? "");
  const [error, setError] = useState("");

  const itemsPreview = useMemo(() => {
    return itemsText
      .split(/[,\n]/g)
      .map(v => v.trim())
      .filter(Boolean);
  }, [itemsText]);

  function submit(event) {
    event.preventDefault();
    setError("");

    if (!order) {
      setError("Заказ не найден.");
      return;
    }

    if (!title.trim()) {
      setError("Введите название заказа.");
      return;
    }

    const updated = updateOrder(orderId, { title, items: itemsText });
    if (!updated) {
      setError("Заказ не найден.");
      return;
    }

    nav(`/basket/${orderId}`);
  }

  if (!order) {
    return (
      <div className="page">
        <h2>Заказ не найден</h2>
        <p className="muted">Возможно, он был удалён.</p>
        <Link className="btn btn-secondary" to="/basket">
          К списку заказов
        </Link>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <h2>Редактировать заказ</h2>
          <p className="muted">ID: {orderId}</p>
        </div>
        <Link className="btn btn-secondary" to={`/basket/${orderId}`}>
          Отмена
        </Link>
      </div>

      <div className="card card-pad">
        {error && (
          <div className="alert" role="alert">
            {error}
          </div>
        )}

        <form className="form" onSubmit={submit}>
          <label className="field">
            <span className="label">Название</span>
            <input value={title} onChange={e => setTitle(e.target.value)} />
          </label>

          <label className="field">
            <span className="label">Позиции</span>
            <textarea
              rows={6}
              value={itemsText}
              onChange={e => setItemsText(e.target.value)}
            />
          </label>

          <div className="form-footer">
            <div className="muted">Позиции: {itemsPreview.length}</div>
            <button className="btn btn-primary" type="submit">
              Сохранить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

