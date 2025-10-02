import React, { createContext, useContext, useEffect, useReducer } from 'react'
import { getPatients } from '../services/api.js'

const Ctx = createContext(null)
export const usePatients = () => useContext(Ctx)

function reducer(state, action){
  switch(action.type){
    case 'set': return { ...state, list: action.payload, loading:false }
    case 'loading': return { ...state, loading:true }
    case 'add': return { ...state, list:[...state.list, action.payload] }
    default: return state
  }
}

export function PatientsProvider({ children }){
  const [state, dispatch] = useReducer(reducer, { list:[], loading:false })

  useEffect(()=>{
    dispatch({ type:'loading' })
    getPatients().then(data => dispatch({ type:'set', payload: data.slice(0,8) }))
  }, [])

  return <Ctx.Provider value={{ state, dispatch }}>{children}</Ctx.Provider>
}
