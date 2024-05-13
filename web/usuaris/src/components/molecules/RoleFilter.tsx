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
import { TRole } from '../../types/types'
import { roles } from '../../constants'

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

  return roles && roles.length > 0 ? (
    <StyledDropdown
      options={roles}
      placeholder={t('Rol')}
      onValueChange={handleSelectedValue}
    />
  ) : null
}
