import React from "react";
import { Link } from "react-router-dom";

export default function HeroCard({
  hero,
  onOrder,
  isFavorite,
  onToggleFavorite,
}) {
  return (
    <div className="card animate-rise hero-card">
      <Link to={`/hero/${hero.id}`} className="hero-link">
        <div className="thumb">
          <img src={hero.image} alt={hero.name} />
        </div>
        <div className="meta">
          <h3>{hero.name}</h3>
          <p className="role">{hero.role}</p>
        </div>
      </Link>

      <div className="hero-actions">
        <button
          className="btn btn-primary"
          type="button"
          onClick={() => onOrder?.(hero)}
        >
          Заказать
        </button>

        <button
          className="btn btn-secondary"
          type="button"
          aria-pressed={isFavorite ? "true" : "false"}
          onClick={() => onToggleFavorite?.(hero.id)}
        >
          {isFavorite ? "В избранном" : "В избранное"}
        </button>
      </div>
    </div>
  );
}

