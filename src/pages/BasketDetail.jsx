import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { acceptOrder, deleteOrder, getOrderById } from "../services/basketApi";

export default function BasketDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const orderId = Number(id);
  const order = getOrderById(orderId);

  function handleAccept() {
    acceptOrder(orderId);
    nav("/basket");
  }

  function handleCancel() {
    const ok = window.confirm("Отменить заказ?");
    if (!ok) return;
    deleteOrder(orderId);
    nav("/basket");
  }

  if (!order) {
    return (
      <div className="page">
        <h2>Заказ не найден</h2>
        <p className="muted">Возможно, он был отменён.</p>
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
          <h2>{order.heroName || "Заказ"}</h2>
          <p className="muted">ID: {order.id}</p>
        </div>

        <div className="actions">
          {order.status === "pending" ? (
            <button className="btn btn-primary" onClick={handleAccept}>
              Принять заказ
            </button>
          ) : (
            <span className="badge badge-accepted">Принят</span>
          )}
          <button className="btn btn-danger" onClick={handleCancel}>
            Отменить
          </button>
          <Link className="btn btn-secondary" to="/basket">
            Назад
          </Link>
        </div>
      </div>

      <div className="card card-pad">
        <div className="order-head">
          {order.heroImage ? (
            <img className="order-thumb" src={order.heroImage} alt="" />
          ) : (
            <div className="order-thumb order-thumb-fallback" />
          )}

          <div className="order-meta">
            <div className="muted">
              {order.heroRole ? `Роль: ${order.heroRole} • ` : ""}
              Кол-во: {order.qty}
            </div>
            {order.heroId ? (
              <Link className="btn btn-secondary" to={`/hero/${order.heroId}`}>
                Открыть героя
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

