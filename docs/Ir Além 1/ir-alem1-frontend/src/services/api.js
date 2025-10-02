export async function getPatients(){
  const res = await fetch('https://jsonplaceholder.typicode.com/users')
  const users = await res.json()
  return users.map(u => ({
    id: u.id,
    name: u.name,
    email: u.email,
    phone: u.phone,
    appointments: Math.floor(Math.random()*4)+1
  }))
}
