import React from "react";

export default function About() {
  return (
    <div className="page">
      <div className="page-head">
        <div>
          <h2>О нас</h2>
          <p className="muted">
            Учебный React SPA на тему Mobile Legends: Bang Bang.
          </p>
        </div>
      </div>

      <div className="card card-pad">
        <p>
          В проекте есть витрина героев с поиском и детальной страницей, а также
          раздел «Заказы», где можно оформить заказ прямо с карточки героя.
        </p>
        <p>
          Цель проекта — показать работу с роутингом, состоянием, LocalStorage и
          базовыми сценариями пользователя.
        </p>
      </div>

      <div className="card card-pad">
        <h3 className="section-title">Фишка проекта: «Избранное»</h3>
        <p>
          На главной странице у каждой карточки героя есть кнопка «В избранное».
          Избранное сохраняется в LocalStorage, поэтому не пропадает после
          перезагрузки. Также есть фильтр «Избранное», который показывает только
          выбранных героев.
        </p>
      </div>
    </div>
  );
}

