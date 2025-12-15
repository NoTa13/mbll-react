import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import HeroCard from "../components/HeroCard";
import { fetchHeroes } from "../services/api";
import { createOrderFromHero } from "../services/basketApi";
import { getFavoriteHeroIds, toggleFavoriteHeroId } from "../services/favorites";

export default function Home() {
  const [heroes, setHeroes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [notice, setNotice] = useState("");
  const [favorites, setFavorites] = useState(() => getFavoriteHeroIds());
  const [onlyFavorites, setOnlyFavorites] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchHeroes().then(data => {
      setHeroes(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!notice) return;
    const t = window.setTimeout(() => setNotice(""), 2200);
    return () => window.clearTimeout(t);
  }, [notice]);

  const favoriteSet = useMemo(() => new Set(favorites), [favorites]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = heroes;
    if (q) {
      list = list.filter(
        h =>
          h.name.toLowerCase().includes(q) || h.role.toLowerCase().includes(q),
      );
    }
    if (onlyFavorites) {
      list = list.filter(h => favoriteSet.has(h.id));
    }
    return list;
  }, [favoriteSet, heroes, onlyFavorites, query]);

  function handleOrder(hero) {
    createOrderFromHero(hero);
    setNotice(`Заказ добавлен: ${hero.name}`);
  }

  function handleToggleFavorite(id) {
    setFavorites(toggleFavoriteHeroId(id));
  }

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <h2>Герои</h2>
          <p className="muted">Выберите героя, чтобы открыть подробности.</p>
        </div>

        <div className="controls">
          <button
            className={onlyFavorites ? "btn btn-primary" : "btn btn-secondary"}
            type="button"
            aria-pressed={onlyFavorites ? "true" : "false"}
            onClick={() => setOnlyFavorites(v => !v)}
            title="Показать только избранных"
          >
            Избранное: {favorites.length}
          </button>
          <span className="badge">{filtered.length}</span>
          <input
            placeholder="Поиск по имени или роли..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
      </div>

      {notice && (
        <div className="notice" role="status">
          <div>{notice}</div>
          <Link className="btn btn-ghost" to="/basket">
            К заказам
          </Link>
        </div>
      )}

      {loading ? (
        <p className="muted">Загрузка...</p>
      ) : filtered.length === 0 ? (
        <div className="empty">
          <p className="muted">Ничего не найдено.</p>
        </div>
      ) : (
        <div className="grid">
          {filtered.map(h => (
            <HeroCard
              key={h.id}
              hero={h}
              onOrder={handleOrder}
              isFavorite={favoriteSet.has(h.id)}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
}
