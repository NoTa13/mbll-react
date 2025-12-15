import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchHeroById } from "../services/api";

export default function Detail() {
  const { id } = useParams();
  const nav = useNavigate();
  const [hero, setHero] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchHeroById(Number(id)).then(h => {
      setHero(h);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <p className="muted">Загрузка...</p>;
  if (!hero) {
    return (
      <div className="page">
        <h2>Герой не найден</h2>
        <p className="muted">Проверьте ссылку или вернитесь назад.</p>
        <button className="btn btn-secondary" onClick={() => nav(-1)}>
          Назад
        </button>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="detail-card animate-fade">
        <img src={hero.image} alt={hero.name} />
        <div className="detail-body">
          <h2>{hero.name}</h2>
          <p className="role">Роль: {hero.role}</p>
          <p>{hero.desc}</p>
          <div className="actions">
            <button className="btn btn-secondary" onClick={() => nav(-1)}>
              Назад
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

