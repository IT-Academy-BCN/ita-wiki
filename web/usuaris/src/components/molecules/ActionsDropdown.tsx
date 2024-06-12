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
import { useAuth } from '../../context/AuthProvider'

type TStyledDropdown = {
  disabled: boolean | undefined
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

type TActionsDropdown = {
  selectedStatus: UserStatus | undefined
  handleAction: (action: string | undefined) => void
  isActionFinished: boolean
}

export const ActionsDropdown: FC<TActionsDropdown> = ({
  selectedStatus,
  handleAction,
  isActionFinished,
}) => {
  const { t } = useTranslation()

  const [actionsList, setActionsList] = useState<TDropdownOption[]>([])
  const { user } = useAuth()

  useEffect(() => {
    switch (selectedStatus) {
      case UserStatus.ACTIVE:
        if(user?.role === 'ADMIN'){
          setActionsList([
            { id: UserStatus.BLOCKED, name: t('Bloquear'), icon: 'block' },
            { id: 'DELETE', name: t('Eliminar'), icon: 'delete_forever' },
          ])
        } else if(user?.role === 'MENTOR') {
          setActionsList([
            { id: UserStatus.BLOCKED, name: t('Bloquear'), icon: 'block' },
          ])
        }
        break
      case UserStatus.PENDING:
        if(user?.role === 'ADMIN'){
          setActionsList([
            { id: UserStatus.ACTIVE, name: t('Aceptar'), icon: 'task_alt' },
            { id: 'DELETE', name: t('Eliminar'), icon: 'delete_forever' },
          ])
        } else if(user?.role === 'MENTOR') {
          setActionsList([
            { id: UserStatus.ACTIVE, name: t('Aceptar'), icon: 'task_alt' },
          ])
        }
        break
      case UserStatus.BLOCKED:
        if(user?.role === 'ADMIN'){
          setActionsList([
            { id: UserStatus.ACTIVE, name: t('Desbloquear'), icon: 'task_alt' },
            { id: 'DELETE', name: t('Eliminar'), icon: 'delete_forever' },
          ])
        } else if(user?.role === 'MENTOR') {
          setActionsList([
            { id: UserStatus.ACTIVE, name: t('Desbloquear'), icon: 'task_alt' },
          ])
        }
        break
      default:
        setActionsList([])
    }
  }, [selectedStatus, t, user])

  const handleSelectedValue = (selectedOption: TDropdownOption | undefined) => {
    handleAction(selectedOption?.id)
  }

  return (
    <StyledDropdown
      options={actionsList}
      placeholder={t('Acciones')}
      onValueChange={handleSelectedValue}
      openText={t('Abrir')}
      closeText={t('Cerrar')}
      deselectText={t('Deseleccionar')}
      data-testid="actions-dropdown"
      disabled={!selectedStatus}
      resetSelectedValue={isActionFinished}
    />
  )
}
