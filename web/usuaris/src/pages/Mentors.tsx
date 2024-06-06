import { FC } from 'react'
import { Navigate } from 'react-router-dom'
import { Dashboard } from '../components/organisms'
import { useAuth } from '../context/AuthProvider'
import { paths } from '../constants'

export const Mentors: FC = () => {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to={paths.home} replace />
  }

  return (
    <div data-testid="test-mentors-page">
      <Dashboard />
    </div>
  )
}
