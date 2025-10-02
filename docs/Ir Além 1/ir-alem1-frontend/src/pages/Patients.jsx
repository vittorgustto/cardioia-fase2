import React from 'react'
import { usePatients } from '../contexts/PatientsContext.jsx'

export default function Patients(){
  const { state } = usePatients()

  return (
    <div className="container">
      <h2>Pacientes</h2>
      <div className="row">
        {state.list.map(p => (
          <div className="card" key={p.id}>
            <h3 style={{margin:'6px 0'}}>{p.name}</h3>
            <div className="small">{p.email}</div>
            <div className="small">{p.phone}</div>
            <div style={{marginTop:8}}>Consultas agendadas: <b>{p.appointments}</b></div>
          </div>
        ))}
      </div>
    </div>
  )
}
