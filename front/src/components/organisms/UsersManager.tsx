import { useAuth } from '../../context/AuthProvider'
import { AccountAdmin } from '../../pages/AccountAdim'

const UsersManager = () => {
  const { user } = useAuth()

  return (
    <>
      Users Manager
      {user?.role === 'ADMIN' && <AccountAdmin />}
    </>
  )
}

export { UsersManager }
