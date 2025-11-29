import React from 'react'
import { Link } from 'react-router-dom'


export default function HeroCard({ hero }){
return (
<Link to={`/hero/${hero.id}`} className="card animate-rise">
<div className="thumb">
<img src={hero.image} alt={hero.name} />
</div>
<div className="meta">
<h3>{hero.name}</h3>
<p className="role">{hero.role}</p>
</div>
</Link>
)
}