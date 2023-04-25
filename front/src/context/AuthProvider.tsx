import React, { createContext, useContext, useMemo, useState } from 'react'

type TAuthContext = {
  isLoggedIn: boolean
  children: React.ReactNode
}

export const authContext = createContext<TAuthContext>({
  isLoggedIn: false,
  children: null,
})

// hook
export const useAuth = () => {
  const context = useContext(authContext)
  return context
}

export const AuthProvider: React.FC<TAuthContext> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const value = useMemo(
    () => ({ isLoggedIn, children }),
    [children, isLoggedIn]
  )

  return <authContext.Provider value={value}>{children}</authContext.Provider>
}
