import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import { urls } from '../constants'

type TUser = {
  name: string
  avatar: string
} | null

type TAuthContext = {
  user: TUser
  children: React.ReactNode
  setUser: (user: TUser) => void
}

export const authContext = createContext<TAuthContext>({
  children: null,
  user: null,
  setUser: () => {},
})

// hook
export const useAuth = () => {
  const context = useContext(authContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}

export const AuthProvider: React.FC<Omit<TAuthContext, 'user' | 'setUser'>> = ({
  children,
}) => {
  const [user, setUser] = useState<TUser>(null)

  const value = useMemo(() => ({ children, user, setUser }), [children, user])

  useEffect(() => {
    fetch(urls.getMe)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setUser(data)
      })
      .catch(() => {
        setUser(null)
      })
  }, [])

  return <authContext.Provider value={value}>{children}</authContext.Provider>
}
