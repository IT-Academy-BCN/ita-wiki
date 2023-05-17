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
  error: string
  setError: (error: string) => void
}

export const authContext = createContext<TAuthContext>({
  children: null,
  user: null,
  setUser: () => {},
  error: '',
  setError: () => {},
})

// hook
export const useAuth = () => {
  const context = useContext(authContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}

export const AuthProvider: React.FC<
  Omit<TAuthContext, 'user' | 'setUser' | 'error' | 'setError'>
> = ({ children }) => {
  const [user, setUser] = useState<TUser>(null)
  const [error, setError] = useState('')

  const value = useMemo(
    () => ({ children, user, setUser, error, setError }),
    [children, user, error]
  )

  useEffect(() => {
    fetch(urls.getMe)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText)
        }
        return res.json()
      })
      .then((data) => {
        setUser(data)
      })
      .catch((err) => {
        setError(err.message)
        setUser(null)
      })
  }, [])

  return <authContext.Provider value={value}>{children}</authContext.Provider>
}
