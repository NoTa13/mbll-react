import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Detail from './pages/Detail'
import ThemeToggle from './components/ThemeToggle'


export default function App() {
return (
<div className="app-root">
<header className="topbar">
<Link to="/" className="logo">MLBB Heroes</Link>
<div className="right">
<Link to="/" className="navlink">Список</Link>
<ThemeToggle />
</div>
</header>


<main className="container">
<Routes>
<Route path="/" element={<Home />} />
<Route path="/hero/:id" element={<Detail />} />
</Routes>
</main>


<footer className="footer">© Mobile Legends fan site — Demo</footer>
</div>
)
}