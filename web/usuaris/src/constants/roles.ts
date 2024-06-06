import i18n from '../i18n'
import { TRole, UserRole } from '../types'

type TRoleKey = keyof typeof UserRole

const getRoles = (roles: TRoleKey[]): TRole[] =>
  roles.map((role: TRoleKey) => ({
    id: role,
    name: i18n.t(role),
    slug: role,
  }))

export const roles = getRoles(Object.keys(UserRole) as TRoleKey[])
