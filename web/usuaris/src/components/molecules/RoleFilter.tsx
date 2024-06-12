import { FC } from 'react'
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

type TStyledDropdown = {
  disabled?: boolean
}

const StyledDropdown = styled(Dropdown)<TStyledDropdown>`
  && div {
    cursor: ${({ disabled }) => (disabled && 'not-allowed') || 'pointer'};
  }

  && button {
    width: 210px;
    padding: ${dimensions.spacing.xxs};
    font-size: ${font.xs};
    font-weight: 500;
    opacity: ${({ disabled }) => (disabled && '0.6') || '1'};
    pointer-events: ${({ disabled }) => (disabled && 'none') || 'auto'};

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
      options={roles}
      placeholder={t('Rol')}
      onValueChange={handleSelectedValue}
      disabled={user?.role === 'MENTOR'}
    />
  ) : null
}
