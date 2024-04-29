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
import { type TStatus } from '../../types'

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

const statusOptions = ['ACTIVE', 'PENDING', 'BLOCKED']

type TStatusItem = {
  icon?: string
} & TStatus

type TStatusDropdown = {
  handleStatus: (value: TStatusItem | undefined) => void
}

export const StatusDropdown: FC<TStatusDropdown> = ({ handleStatus }) => {
  const { t } = useTranslation()

  const [statusList, setStatusList] = useState<TStatusItem[]>([])

  const getIconStatus = (statusOption: string) => {
    if (statusOption === 'ACTIVE') {
      return 'task_alt'
    }
    if (statusOption === 'BLOCKED') {
      return 'block'
    }
    return 'pending'
  }

  useEffect(() => {
    const statusItems: TStatusItem[] = statusOptions.map((option) => ({
      id: option,
      name: t(`${option}`),
      icon: getIconStatus(option),
    }))

    setStatusList(statusItems)
  }, [t])

  const handleSelectedValue = (selectedOption: TDropdownOption | undefined) => {
    if (selectedOption) {
      handleStatus(selectedOption)
    } else {
      handleStatus(undefined)
    }
  }

  return statusList && statusList.length > 0 ? (
    <StyledDropdown
      options={statusList}
      placeholder={t('Estado')}
      onValueChange={handleSelectedValue}
      openText={t('Abrir')}
      closeText={t('Cerrar')}
      deselectText={t('Deseleccionar')}
    />
  ) : null
}
