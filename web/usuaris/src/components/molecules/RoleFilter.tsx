import { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import {
  colors,
  dimensions,
  Dropdown,
  font,
  type TDropdownOption,
} from '@itacademy/ui'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { TRole, UserRole } from '../../types'
import { paths, roles } from '../../constants'
import { useAuth } from '../../context/AuthProvider'

const StyledDropdown = styled(Dropdown)`
  && button {
    width: 210px;
    padding: ${dimensions.spacing.xxs};
    font-size: ${font.xs};
    font-weight: 500;

    &:hover {
      background-color: ${colors.primary};
      color: ${colors.white};
    }

    > span {
      padding-left: ${dimensions.spacing.xxxs};
      font-weight: 400;
    }
  }
`

type TRoleFilter = {
  handleRole: (value: TRole | undefined) => void
}

export const RoleFilter: FC<TRoleFilter> = ({ handleRole }) => {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const { user } = useAuth()

  const [roleList, setRoleList] = useState<TRole[]>([])

  useEffect(() => {
    const roleDropdownList = Object.values(UserRole).map((role) => ({
      id: role.toString(),
      name: t(`${role}`),
      slug: role.toString(),
    }))
    setRoleList(roleDropdownList)
  }, [t])

  const handleSelectedValue = (selectedOption: TDropdownOption | undefined) => {
    if (selectedOption) {
      const selectedRole = roles.find(
        (role: TRole) => role.id === selectedOption.id
      )
      if (selectedRole) {
        handleRole(selectedRole)
      }
    } else {
      handleRole(undefined)
    }
  }

  if (pathname === paths.mentors)
    return (
      <StyledDropdown
        options={roles}
        placeholder={t(UserRole.MENTOR)}
        disabled
      />
    )

  return roles && roles.length > 0 ? (
    <StyledDropdown
      options={roleList}
      placeholder={
        user?.role === UserRole.MENTOR ? t(UserRole.REGISTERED) : t('Rol')
      }
      onValueChange={handleSelectedValue}
      disabled={user?.role === UserRole.MENTOR}
    />
  ) : null
}
