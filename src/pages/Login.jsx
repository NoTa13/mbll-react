import React, { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { login as loginService } from "../services/auth";

export default function Login({ user, onLogin }) {
  const nav = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (user) return <Navigate to="/" replace />;

  function submit(event) {
    event.preventDefault();
    setError("");

    const result = loginService(username.trim(), password);
    if (!result.ok) {
      setError(result.error);
      return;
    }

    onLogin(result.user);
    const nextPath = location.state?.from?.pathname || "/";
    nav(nextPath, { replace: true });
  }

  return (
    <div className="auth-wrap">
      <div className="auth-card animate-fade">
        <h2>Вход</h2>
        <p className="muted">
          Для доступа к сайту войдите под демо-аккаунтом.
        </p>

        {error && (
          <div className="alert" role="alert">
            {error}
          </div>
        )}

        <form className="form" onSubmit={submit}>
          <label className="field">
            <span className="label">Логин</span>
            <input
              autoComplete="username"
              placeholder="salim"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </label>

          <label className="field">
            <span className="label">Пароль</span>
            <input
              type="password"
              autoComplete="current-password"
              placeholder="123123"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </label>

          <button className="btn btn-primary" type="submit">
            Войти
          </button>
        </form>

        <div className="hint">
          Данные для входа: <b>salim</b> / <b>123123</b>
        </div>
      </div>
    </div>
  );
}

