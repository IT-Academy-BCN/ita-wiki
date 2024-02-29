/* eslint-disable react/no-unstable-nested-components */
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import styled from 'styled-components'
import {
  Button,
  FlexBox,
  Spinner,
  colors,
  dimensions,
  font,
} from '@itacademy/ui'
import { Table } from '../molecules'
import { TUserData } from '../../types'
import { icons } from '../../assets/icons'
import { useGetUsers } from '../../hooks'

const CellStyled = styled.span``

const IconStyled = styled.img`
  padding-left: ${dimensions.spacing.xxxs};
`

type TStatusStyled = {
  status: string
}

const StatusStyled = styled.div<TStatusStyled>`
  width: max-content;
  padding: ${dimensions.spacing.xxxs} ${dimensions.spacing.base}
    ${dimensions.spacing.xxxs} ${dimensions.spacing.base};
  border-radius: ${dimensions.borderRadius.xs};
  background-color: ${({ status }) => {
    switch (status) {
      case 'INACTIVE':
        return '#FCD9D9'
      case 'BLOCKED':
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

const ActionsContainer = styled(FlexBox)`
  width: auto;
`

export const UsersTable: FC = () => {
  const { t } = useTranslation()
  const { isLoading, isError, data: users } = useGetUsers()

  const columHelper = createColumnHelper<TUserData>()

  const columns: ColumnDef<TUserData, string>[] = [
    columHelper.accessor('name', {
      header: `${t('Nombre')}`,
    }),
    columHelper.accessor('itineraryName', {
      header: `${t('Especialización')}`,
      cell: ({ row }) => {
        const itineraryName: string = row.getValue('itineraryName')
        let formattedName: string = ''

        if (itineraryName !== null) {
          formattedName =
            itineraryName.split('-')[1].charAt(0).toUpperCase() +
            itineraryName.split('-')[1].slice(1)
        }
        return <CellStyled>{formattedName}</CellStyled>
      },
    }),
    columHelper.accessor('status', {
      header: () => (
        <CellStyled>
          {t('Estado')}
          <IconStyled src={icons.sortDown} alt="sort-down" />
        </CellStyled>
      ),
      cell: ({ row }) => {
        const status: string = row.getValue('status')
        let displayedStatus: string = ''

        if (status === 'INACTIVE') {
          displayedStatus = t('pendiente')
        } else if (status === 'BLOCKED') {
          displayedStatus = t('bloqueado')
        } else {
          displayedStatus = t('activo')
        }
        return <StatusStyled status={status}>{displayedStatus}</StatusStyled>
      },
    }),
    columHelper.accessor('createdAt', {
      header: `${t('Fecha alta')}`,
      cell: ({ row }) => {
        const createdAt = row.getValue('createdAt')
        const formattedDate = new Date(createdAt as string).toLocaleDateString()

        return <CellStyled>{formattedDate}</CellStyled>
      },
    }),
    columHelper.display({
      id: 'actions',
      header: `${t('Acciones')}`,
      cell: ({ row }) => {
        const status: string = row.getValue('status')
        let buttonTxt: string = ''

        if (status === 'INACTIVE') {
          buttonTxt = t('Aceptar')
        } else if (status === 'BLOCKED') {
          buttonTxt = t('Desbloquear')
        } else {
          buttonTxt = t('Bloquear')
        }
        return (
          <ActionsContainer align="end">
            <ButtonStyled size="small" outline>
              {buttonTxt}
            </ButtonStyled>
          </ActionsContainer>
        )
      },
    }),
  ]

  if (isLoading) return <Spinner size="medium" role="status" />
  if (isError) return <p>{t('Ha habido un error...')}</p>
  return (
    <Table
      columns={columns}
      data={users || []}
      noResultsMessage={t('No hay usuarios para mostrar')}
    />
  )
}
