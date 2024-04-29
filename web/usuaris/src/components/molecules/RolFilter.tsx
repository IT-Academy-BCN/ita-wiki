import { FC, useState } from 'react'
import styled from 'styled-components'
import {
  colors,
  dimensions,
  Dropdown,
  font,
  type TDropdownOption,
} from '@itacademy/ui'
import { useTranslation } from 'react-i18next'
import { TRol } from '../../types/types'

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
  handleRole: (value: TRol) => void
}

export const RolFilter: FC<TRolDropdown> = ({ handleRole }) => {
  const { t } = useTranslation()

  const [RolesList, setRolesList] = useState<TRol[]>([
    { id: '1', name: t('administrador'), slug: 'ADMIN' },
    { id: '2', name: t('registrado'), slug: 'REGISTERED' },
  ])

  const handleSelectedValue = (selectedOption: TDropdownOption | undefined) => {
    if (selectedOption) {
      const selectedRole = RolesList.find(
        (cat: TRol) => cat.id === selectedOption.id
      )
      handleRole(selectedRole)
    } else {
      handleRole(undefined)
    }
  }

  return RolesList && RolesList.length > 0 ? (
    <StyledDropdown
      options={RolesList}
      placeholder={t('Rol')}
      onValueChange={handleSelectedValue}
    />
  ) : null
}
