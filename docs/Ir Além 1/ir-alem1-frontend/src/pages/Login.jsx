import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.jsx'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  function handleSubmit(e){
    e.preventDefault()
    const ok = login({ email, password })
    if(!ok){ setError('Credenciais inválidas'); return }
    navigate('/')
  }

  return (
    <div className="container">
      <div className="card" style={{maxWidth:480, margin:'40px auto'}}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <label>E-mail</label>
          <input className="input" value={email} onChange={e=>setEmail(e.target.value)} />
          <label>Senha</label>
          <input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
          {error && <p style={{color:'#fda4af'}}>{error}</p>}
          <div style={{marginTop:12}}>
            <button className="btn" type="submit">Entrar</button>
          </div>
        </form>
      </div>
    </div>
  )
}
