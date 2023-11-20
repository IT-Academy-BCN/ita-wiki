import { useTranslation } from 'react-i18next'
import { useAuth } from '../../context/AuthProvider'
import { AccountAdmin } from './AccountAdim'

const UsersManager = () => {
  const { user } = useAuth()

  const { t } = useTranslation()

  return (
    <>
      {t('Administrador de Usuarios')}
      {user?.role === 'ADMIN' && <AccountAdmin />}
    </>
  )
}

export { UsersManager }
