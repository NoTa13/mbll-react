import React, { useEffect, useState } from 'react'


export default function ThemeToggle(){
const [dark, setDark] = useState(()=> localStorage.getItem('dark') === '1')


useEffect(()=>{
document.documentElement.dataset.theme = dark ? 'dark' : 'light'
localStorage.setItem('dark', dark ? '1' : '0')
}, [dark])


return (
<button className="theme-toggle" onClick={()=>setDark(d=>!d)}>{dark ? '🌙' : '☀️'}</button>
)
}