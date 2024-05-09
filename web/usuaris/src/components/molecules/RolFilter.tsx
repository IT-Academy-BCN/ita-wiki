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
import { TRol, UserRole } from '../../types/types'

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

type TRolDropdown = {
  handleRole: (value: TRol | undefined) => void
}

export const RolFilter: FC<TRolDropdown> = ({ handleRole }) => {
  const { t } = useTranslation()

  const rolesList: TRol[] = [
    { id: '1', name: t('ADMIN'), slug: UserRole.ADMIN },
    { id: '2', name: t('REGISTERED'), slug: UserRole.REGISTERED },
    { id: '3', name: t('MENTOR'), slug: UserRole.MENTOR },
  ]

  const handleSelectedValue = (selectedOption: TDropdownOption | undefined) => {
    if (selectedOption) {
      const selectedRole = rolesList.find(
        (role: TRol) => role.id === selectedOption.id
      )
      if (selectedRole) {
        handleRole(selectedRole)
      }
    } else {
      handleRole(undefined)
    }
  }

  return rolesList && rolesList.length > 0 ? (
    <StyledDropdown
      options={rolesList}
      placeholder={t('Rol')}
      onValueChange={handleSelectedValue}
    />
  ) : null
}
