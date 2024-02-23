import { Button, colors, dimensions, font } from '@itacademy/ui'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { type FC } from 'react'
import { icons } from '../../assets/icons'
import { type TStatus, type TUser } from '../../pages'

const TableStyled = styled.table`
  width: 100%;
  color: ${colors.black.black3};
  font-size: ${font.xs};
  font-weight: ${font.regular};

  thead {
    text-align: left;
    font-weigh: ${font.bold};
    th {
      padding-bottom: ${dimensions.spacing.sm};
      min-width: 8.3rem;

      &:last-child {
        text-align: center;
      }
    }
  }

  tbody {
    td {
      padding-bottom: ${dimensions.spacing.xs};
      height: 3.1rem;
    }
    .button-container {
      display: flex;
      justify-content: flex-end;
      width: auto;
    }
  }
`

const SortDownIcon = styled.img`
  padding: 0 ${dimensions.spacing.xxxs};
`

type TStatusStyled = {
  status: TStatus
}

const StatusStyled = styled.div<TStatusStyled>`
  width: max-content;
  padding: ${dimensions.spacing.xxxs} ${dimensions.spacing.base}
    ${dimensions.spacing.xxxs} ${dimensions.spacing.base};
  border-radius: ${dimensions.borderRadius.xs};
  background-color: ${({ status }) => {
    switch (status) {
      case 'pendiente':
        return '#FCD9D9'
      case 'bloqueado':
        return '#FCDEC0'
      default:
        return '#C6F1DA'
    }
  }};
  font-weight: ${font.medium};
  color: ${colors.black.black3};
`

const ButtonStyled = styled(Button)`
  width: auto;
  padding: ${dimensions.spacing.xxxs} ${dimensions.spacing.base}
    ${dimensions.spacing.xxxs} ${dimensions.spacing.base};
  border: solid 1px ${colors.black.black3};
  font-weight: ${font.medium};
  color: ${colors.black.black3};
`
export type TUsersTable = {
  users: TUser[]
}

export const UsersTable: FC<TUsersTable> = ({ users }) => {
  const { t } = useTranslation()

  const userRows = users.map((user) => {
    let buttonTxt: string

    if (user.status === 'pendiente') {
      buttonTxt = t('Aceptar')
    } else if (user.status === 'activo') {
      buttonTxt = t('Bloquear')
    } else {
      buttonTxt = t('Desbloquear')
    }

    return (
      <tr key={user.name}>
        <td>{user.name}</td>
        <td>{user.specialization}</td>
        <td>
          <StatusStyled status={user.status}>{t(user.status)}</StatusStyled>
        </td>
        <td>{user.registrationDate}</td>
        <td className="button-container">
          <ButtonStyled size="small" outline>
            {buttonTxt}
          </ButtonStyled>
        </td>
      </tr>
    )
  })

  return (
    <TableStyled>
      <thead>
        <tr>
          <th>{t('Nombre')}</th>
          <th>{t('Especialización')}</th>
          <th>
            {t('Estado')}
            <SortDownIcon src={icons.sortDown} alt="sort-down" />
          </th>
          <th>{t('Fecha alta')}</th>
          <th>{t('Acciones')}</th>
        </tr>
      </thead>
      <tbody>{userRows}</tbody>
    </TableStyled>
  )
}
