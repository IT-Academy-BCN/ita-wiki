import { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import {
  colors,
  dimensions,
  Dropdown,
  font,
  Spinner,
  type TDropdownOption,
} from '@itacademy/ui'
import { useTranslation } from 'react-i18next'
import { useGetItineraries } from '../../hooks'
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
    { id: '1', name: 'Admin' },
    { id: '2', name: 'Registered' },
    { id: '3', name: 'Mentor' },
  ])

  // const { isLoading, error, data } = useGetRoles()

  // useEffect(() => {
  //   const newData = data?.map((cat: TRol) => ({
  //     ...cat,
  //   }))
  //   setRolesList(newData)
  // }, [data])

  const handleSelectedValue = (selectedOption: TDropdownOption) => {
    const selectedRole = RolesList.find(
      (cat: TRol) => cat.id === selectedOption.id
    )
  }

  // if (isLoading) {
  //   return <Spinner size="small" as="output" data-testid="spinner" />
  // }

  // if (error) return <p>{t('Ha habido un error...')} </p>

  return RolesList && RolesList.length > 0 ? (
    <StyledDropdown
      options={RolesList}
      placeholder={t('Rol')}
      onValueChange={handleSelectedValue}
    />
  ) : null
}
