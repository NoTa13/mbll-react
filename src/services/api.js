export async function fetchHeroes(){
try{
const res = await fetch('/heroes.json')
if(!res.ok) throw new Error('Network')
return await res.json()
}catch(err){
// local fallback
return []
}
}


export async function fetchHeroById(id){
const heroes = await fetchHeroes()
return heroes.find(h=>h.id === id) || null
}