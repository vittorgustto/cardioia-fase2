import React from 'react'
import { Routes, Route, Link, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext.jsx'
import { PatientsProvider } from './contexts/PatientsContext.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Patients from './pages/Patients.jsx'
import Schedule from './pages/Schedule.jsx'

function Protected({ children }){
  const { user } = useAuth()
  if(!user) return <div className="container"><div className="card protected">Necessário login. <Link to="/login">Fazer login</Link></div></div>
  return children
}

export default function App(){
  return (
    <AuthProvider>
      <PatientsProvider>
        <div className="container">
          <nav className="nav">
            <Link to="/">Dashboard</Link>
            <Link to="/patients">Pacientes</Link>
            <Link to="/schedule">Agendamentos</Link>
            <Link to="/login">Login</Link>
          </nav>
        </div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Protected><Dashboard /></Protected>} />
          <Route path="/patients" element={<Protected><Patients /></Protected>} />
          <Route path="/schedule" element={<Protected><Schedule /></Protected>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </PatientsProvider>
    </AuthProvider>
  )
}
