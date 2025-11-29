import React, { useEffect, useState } from 'react'
import HeroCard from '../components/HeroCard'
import { fetchHeroes } from '../services/api'


export default function Home() {
const [heroes, setHeroes] = useState([])
const [loading, setLoading] = useState(true)
const [query, setQuery] = useState('')


useEffect(() => {
setLoading(true)
fetchHeroes().then(data => {
setHeroes(data)
setLoading(false)
})
}, [])


const filtered = heroes.filter(h => h.name.toLowerCase().includes(query.toLowerCase()) || h.role.toLowerCase().includes(query.toLowerCase()))


return (
<div>
<div className="controls">
<input placeholder="Поиск героя или роли..." value={query} onChange={e=>setQuery(e.target.value)} />
</div>


{loading ? <p>Загрузка...</p> : (
<div className="grid">
{filtered.map(h => <HeroCard key={h.id} hero={h} />)}
</div>
)}
</div>
)
}