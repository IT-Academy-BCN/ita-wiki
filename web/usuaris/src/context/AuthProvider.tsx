import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { urls } from '../constants'
import { UserRole, TRole } from '../types'

export type TUser = {
  dni: string
  email: string
  role: UserRole
} | null

export type TAuthContext = {
  user: TUser
  children: React.ReactNode
  setUser: (user: TUser) => void
  error: string
  setError: (error: string) => void
  role: TRole | undefined
  setRole:(role: TRole | undefined) => void
}

const authContext = createContext<TAuthContext | null>(null)

export const useAuth = () => {
  const context = useContext(authContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}

export const AuthProvider: React.FC<
  Omit<TAuthContext, 'user' | 'setUser' | 'error' | 'setError' | 'role' |'setRole'>
> = ({ children }) => {
  const [user, setUser] = useState<TUser>(null)
  const [error, setError] = useState('')
  const [role, setRole]= useState<TRole | undefined>(undefined)
  
  const value = useMemo(
    () => ({ children, user, setUser, error, setError, role, setRole }),
    [children, user, error, role]
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
