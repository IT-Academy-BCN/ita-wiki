import { useAuth } from '../../context/AuthProvider'
import { useTranslation } from 'react-i18next'
import { AccountAdmin } from '../../pages/AccountAdim'

const UsersManager = () => {
  const { user } = useAuth()

  const { t } = useTranslation()

  return (
    <>
      {t('Administrador de Usuarios')}
      {user?.role === 'ADMIN' && <AccountAdmin />}
      {user?.role === 'MENTOR' && (
        <p>{t("No tienes permisos suficientes para acceder al contenido.")}</p>
      )}
    </>
  )
}

export { UsersManager }
