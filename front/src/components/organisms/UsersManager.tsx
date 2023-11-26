import { useTranslation } from 'react-i18next'
import { useAuth } from '../../context/AuthProvider'
import { AccountAdmin } from './AccountAdim'
import { TINDEX } from '../../locales/translationIndex'

const UsersManager = () => {
  const { user } = useAuth()

  const { t } = useTranslation()

  return (
    <>
      {t(TINDEX.USERS_MANAGER)}
      {user?.role === 'ADMIN' && <AccountAdmin />}
    </>
  )
}

export { UsersManager }
