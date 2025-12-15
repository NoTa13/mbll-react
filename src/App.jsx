import React, { useState } from "react";
import {
  Link,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";

import ThemeToggle from "./components/ThemeToggle";
import About from "./pages/About";
import BasketDetail from "./pages/BasketDetail";
import BasketList from "./pages/BasketList";
import Detail from "./pages/Detail";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { getAuthUser, logout as logoutService } from "./services/auth";

function ProtectedRoute({ user }) {
  const location = useLocation();
  if (!user) return <Navigate to="/login" replace state={{ from: location }} />;
  return <Outlet />;
}

function Layout({ user, onLogout }) {
  const nav = useNavigate();

  function handleLogout() {
    onLogout();
    nav("/login", { replace: true });
  }

  return (
    <div className="app-root">
      <header className="topbar">
        <Link to="/" className="logo">
          MLBB Heroes
        </Link>

        <div className="right">
          {user ? (
            <>
              <Link to="/" className="navlink">
                Главная
              </Link>
              <Link to="/basket" className="navlink">
                Заказы
              </Link>
              <Link to="/about" className="navlink">
                О нас
              </Link>
              <span className="chip" title="Пользователь">
                {user}
              </span>
            </>
          ) : null}

          <ThemeToggle />

          {user ? (
            <button className="btn btn-ghost" onClick={handleLogout}>
              Выйти
            </button>
          ) : null}
        </div>
      </header>

      <main className="container">
        <Outlet />
      </main>

      <footer className="footer">
        <div className="footer-inner">
          <div>© MLBB Heroes — Demo</div>
          <div className="footer-contacts">
            Контакты:{" "}
            <a
              href="https://wa.me/996704236475"
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp +996704236475
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState(() => getAuthUser());

  function handleLogout() {
    logoutService();
    setUser(null);
  }

  return (
    <Routes>
      <Route element={<Layout user={user} onLogout={handleLogout} />}>
        <Route path="/login" element={<Login user={user} onLogin={setUser} />} />

        <Route element={<ProtectedRoute user={user} />}>
          <Route path="/" element={<Home />} />
          <Route path="/hero/:id" element={<Detail />} />

          <Route path="/basket" element={<BasketList />} />
          <Route path="/basket/:id" element={<BasketDetail />} />

          <Route path="/about" element={<About />} />
        </Route>

        <Route
          path="*"
          element={<Navigate to={user ? "/" : "/login"} replace />}
        />
      </Route>
    </Routes>
  );
}

