import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { acceptOrder, deleteOrder, getOrders } from "../services/basketApi";

function statusBadge(order) {
  if (order.status === "accepted") {
    return <span className="badge badge-accepted">Принят</span>;
  }
  return <span className="badge badge-pending">Ожидает</span>;
}

export default function BasketList() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("all"); // all | pending | accepted

  useEffect(() => {
    setOrders(getOrders());
  }, []);

  const visible = useMemo(() => {
    if (filter === "pending") return orders.filter(o => o.status === "pending");
    if (filter === "accepted") return orders.filter(o => o.status === "accepted");
    return orders;
  }, [filter, orders]);

  function refresh() {
    setOrders(getOrders());
  }

  function handleAccept(id) {
    acceptOrder(id);
    refresh();
  }

  function handleCancel(id) {
    const ok = window.confirm("Отменить заказ?");
    if (!ok) return;
    deleteOrder(id);
    refresh();
  }

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <h2>Заказы</h2>
          <p className="muted">
            Заказ создаётся на главной странице кнопкой «Заказать».
          </p>
        </div>

        <div className="actions">
          <button
            className={filter === "all" ? "btn btn-primary" : "btn btn-secondary"}
            type="button"
            aria-pressed={filter === "all" ? "true" : "false"}
            onClick={() => setFilter("all")}
          >
            Все
          </button>
          <button
            className={
              filter === "pending" ? "btn btn-primary" : "btn btn-secondary"
            }
            type="button"
            aria-pressed={filter === "pending" ? "true" : "false"}
            onClick={() => setFilter("pending")}
          >
            Ожидают
          </button>
          <button
            className={
              filter === "accepted" ? "btn btn-primary" : "btn btn-secondary"
            }
            type="button"
            aria-pressed={filter === "accepted" ? "true" : "false"}
            onClick={() => setFilter("accepted")}
          >
            Принятые
          </button>
        </div>
      </div>

      {visible.length === 0 ? (
        <div className="empty">
          <p className="muted">Пока нет заказов по выбранному фильтру.</p>
          <Link className="btn btn-secondary" to="/">
            Перейти к героям
          </Link>
        </div>
      ) : (
        <div className="grid grid-orders">
          {visible.map(o => (
            <div key={o.id} className="card card-pad">
              <div className="order-head">
                {o.heroImage ? (
                  <img className="order-thumb" src={o.heroImage} alt="" />
                ) : (
                  <div className="order-thumb order-thumb-fallback" />
                )}

                <div className="order-meta">
                  <div className="order-title-row">
                    <h3 className="card-title">{o.heroName || "Заказ"}</h3>
                    {statusBadge(o)}
                  </div>
                  <div className="muted">
                    {o.heroRole ? `${o.heroRole} • ` : ""}
                    Кол-во: {o.qty}
                  </div>
                </div>
              </div>

              <div className="actions">
                {o.heroId ? (
                  <Link className="btn btn-secondary" to={`/hero/${o.heroId}`}>
                    Открыть героя
                  </Link>
                ) : (
                  <Link className="btn btn-secondary" to={`/basket/${o.id}`}>
                    Детали
                  </Link>
                )}

                {o.status === "pending" ? (
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={() => handleAccept(o.id)}
                  >
                    Принять заказ
                  </button>
                ) : (
                  <span className="muted">Заказ принят</span>
                )}

                <button
                  className="btn btn-danger"
                  type="button"
                  onClick={() => handleCancel(o.id)}
                >
                  Отменить
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

