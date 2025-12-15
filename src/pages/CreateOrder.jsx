import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createOrder } from "../services/basketApi";

export default function CreateOrder() {
  const nav = useNavigate();
  const [title, setTitle] = useState("");
  const [itemsText, setItemsText] = useState("");
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

    if (!title.trim()) {
      setError("Введите название заказа.");
      return;
    }

    createOrder({ title, items: itemsText });
    nav("/basket");
  }

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <h2>Создать заказ</h2>
          <p className="muted">
            Заполните форму и нажмите «Сохранить». Позиции можно вводить через
            запятую или с новой строки.
          </p>
        </div>
        <Link className="btn btn-secondary" to="/basket">
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
            <input
              placeholder="Например: Заказ №1"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </label>

          <label className="field">
            <span className="label">Позиции</span>
            <textarea
              rows={5}
              placeholder={"Например:\nСкин\nАлмазы\nБоевой пропуск"}
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

