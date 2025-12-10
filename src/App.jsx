import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'

// страницы
import Home from './pages/Home'
import Detail from './pages/Detail'
import BasketList from './pages/BasketList'
import BasketDetail from './pages/BasketDetail'
import CreateOrder from './pages/CreateOrder'
import UpdateOrder from './pages/UpdateOrder'

// компоненты
import ThemeToggle from './components/ThemeToggle'

export default function App() {
  return (
    <div className="app-root">

      {/* HEADER */}
      <header className="topbar">
        <Link to="/" className="logo">MLBB Heroes</Link>

        <div className="right">
          <Link to="/" className="navlink">Герои</Link>
          <Link to="/basket" className="navlink">Корзина</Link>
          <ThemeToggle />
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="container">
        <Routes>
          {/* heroes */}
          <Route path="/" element={<Home />} />
          <Route path="/hero/:id" element={<Detail />} />

          {/* basket / orders */}
          <Route path="/basket" element={<BasketList />} />
          <Route path="/basket/:id" element={<BasketDetail />} />
          <Route path="/order/create" element={<CreateOrder />} />
          <Route path="/order/update/:id" element={<UpdateOrder />} />
        </Routes>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        © Mobile Legends fan site — Demo
      </footer>

    </div>
  )
}
