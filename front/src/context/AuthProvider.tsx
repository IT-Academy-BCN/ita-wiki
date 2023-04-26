import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

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

  const url =
    'https://dev.api.itadirectory.eurecatacademy.org/api/v1/auth/login'

  const value = useMemo(() => ({ children, user, setUser }), [children, user])

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setUser(data)
      })
      .catch(() => {
        setUser(null)
      })
  }, [])

  return <authContext.Provider value={value}>{children}</authContext.Provider>
}
