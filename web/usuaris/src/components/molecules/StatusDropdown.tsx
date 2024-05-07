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
import { UserStatus } from '../../types'

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

type TStatusItem = {
  id: string
  name: string
  icon?: string
}

type TStatusDropdown = {
  handleStatus: (value: UserStatus | undefined) => void
}

const statusIcon = {
  [UserStatus.ACTIVE]: 'task_alt',
  [UserStatus.PENDING]: 'pending',
  [UserStatus.BLOCKED]: 'block',
}

export const StatusDropdown: FC<TStatusDropdown> = ({ handleStatus }) => {
  const { t } = useTranslation()

  const [statusList, setStatusList] = useState<TStatusItem[]>([])

  useEffect(() => {
    const statusDropdownList = Object.values(UserStatus).map((status) => ({
      id: status.toString(),
      name: t(`${status}`),
      icon: statusIcon[status],
    }))
    setStatusList(statusDropdownList)
  }, [t])

  const handleSelectedValue = (selectedOption: TDropdownOption | undefined) => {
    const selectedStatus: UserStatus | undefined = Object.values(
      UserStatus
    ).find((status) => status === selectedOption?.id)
    handleStatus(selectedStatus)
  }

  return statusList && statusList.length > 0 ? (
    <StyledDropdown
      options={statusList}
      placeholder={t('Estado')}
      onValueChange={handleSelectedValue}
      openText={t('Abrir')}
      closeText={t('Cerrar')}
      deselectText={t('Deseleccionar')}
      data-testid="status-dropdown"
    />
  ) : null
}
