import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import { type GetMeResponse, fetchGetMe } from '../openapi/openapiComponents'

export type TAuthContext = {
  user: GetMeResponse | null
  children: React.ReactNode
  setUser: (user: GetMeResponse | null) => void
  error: string
  setError: (error: string) => void
}

const authContext = createContext<TAuthContext | null>(null)

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
  const [user, setUser] = useState<GetMeResponse | null>(null)
  const [error, setError] = useState('')

  const value = useMemo(
    () => ({ children, user, setUser, error, setError }),
    [children, user, error]
  )

  useEffect(() => {
    fetchGetMe({})
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
