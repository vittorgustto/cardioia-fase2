import React, { createContext, useContext, useState, useMemo } from 'react'

const AuthCtx = createContext(null)
export const useAuth = () => useContext(AuthCtx)

export function AuthProvider({ children }){
  const [user, setUser] = useState(null)

  function login({ email, password }){
    if(email && password){
      const fakeToken = btoa(`${email}:${Date.now()}`)
      localStorage.setItem('cardioia_token', fakeToken)
      setUser({ email })
      return true
    }
    return false
  }
  function logout(){
    localStorage.removeItem('cardioia_token')
    setUser(null)
  }
  const value = useMemo(()=>({ user, login, logout }), [user])
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>
}
