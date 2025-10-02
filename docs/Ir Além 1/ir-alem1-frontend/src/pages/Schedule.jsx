import React, { useReducer } from 'react'

function reducer(state, action){
  switch(action.type){
    case 'add': return [...state, action.payload]
    default: return state
  }
}

export default function Schedule(){
  const [events, dispatch] = useReducer(reducer, [])
  function add(e){
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.target))
    dispatch({ type:'add', payload: data })
    e.target.reset()
  }
  return (
    <div className="container">
      <h2>Agendamentos</h2>
      <div className="row">
        <div className="card">
          <form onSubmit={add}>
            <label>Paciente</label>
            <input className="input" name="paciente" required />
            <label>Data</label>
            <input className="input" name="data" type="date" required />
            <label>Motivo</label>
            <input className="input" name="motivo" required />
            <div style={{marginTop:10}}><button className="btn">Adicionar</button></div>
          </form>
        </div>
        <div className="card">
          <h3>Próximas consultas</h3>
          {events.length===0 && <div className="small">Nenhum agendamento.</div>}
          {events.map((ev,i)=>(
            <div key={i} className="small" style={{padding:'6px 0', borderBottom:'1px solid #1e2a38'}}>
              {ev.data} — {ev.paciente} — {ev.motivo}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
