import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchHeroById } from '../services/api'


export default function Detail(){
const { id } = useParams()
const nav = useNavigate()
const [hero, setHero] = useState(null)
const [loading, setLoading] = useState(true)


useEffect(()=>{
setLoading(true)
fetchHeroById(Number(id)).then(h => { setHero(h); setLoading(false) })
}, [id])


if(loading) return <p>Загрузка...</p>
if(!hero) return <p>Герой не найден</p>


return (
<div className="detail-card animate-fade">
<img src={hero.image} alt={hero.name} />
<div className="detail-body">
<h2>{hero.name}</h2>
<p className="role">Роль: {hero.role}</p>
<p>{hero.desc}</p>
<button onClick={()=>nav(-1)}>Назад</button>
</div>
</div>
)
}