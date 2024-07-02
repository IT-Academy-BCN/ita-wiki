import { useTranslation } from 'react-i18next'
import { TRole, UserRole } from '../types'

type TRoleKey = keyof typeof UserRole

export const useRoles = () => {
  const { t } = useTranslation()

  const getRoles = (roles: TRoleKey[]): TRole[] =>
    roles.map((role: TRoleKey) => ({
      id: role,
      name: t(role),
      slug: role,
    }))

  const roles = getRoles(Object.keys(UserRole) as TRoleKey[])
  return { roles }
}
