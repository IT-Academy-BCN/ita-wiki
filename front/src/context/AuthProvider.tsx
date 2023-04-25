import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

type TAuthContext = {
  isLoggedIn: boolean
  user: object
  children: React.ReactNode
}

export const authContext = createContext<TAuthContext>({
  isLoggedIn: false,
  children: null,
  user: {},
})

// hook
export const useAuth = () => {
  const context = useContext(authContext)
  return context
}

export const AuthProvider: React.FC<TAuthContext> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const url =
    'https://dev.api.itadirectory.eurecatacademy.org/api/v1/auth/login'

  const value = useMemo(
    () => ({ isLoggedIn, children, user, loading, error }),
    [children, error, isLoggedIn, loading, user]
  )

  useEffect(() => {
    setLoading(true)
    setError(null)
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setUser(data)
        setIsLoggedIn(true)
        setLoading(false)
      })
      .catch((err) => {
        setError(err)
        setLoading(false)
      })
  }, [url])

  return <authContext.Provider value={value}>{children}</authContext.Provider>
}
