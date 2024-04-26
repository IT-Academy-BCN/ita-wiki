/* eslint-disable react/no-unstable-nested-components */
import { ChangeEvent, FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { Checkbox, Spinner, dimensions } from '@itacademy/ui'
import { Table } from '../../molecules'
import { TFilters, TUserData } from '../../../types'
import { icons } from '../../../assets/icons'
import { useGetUsers, useUpdateUser } from '../../../hooks'
import {
  ActionsContainer,
  ActionsHeader,
  ButtonStyled,
  CellStyled,
  DeleteButton,
  DeleteIcon,
  DisabledStyled,
  IconStyled,
  StatusStyled,
  TableContainer,
} from './UsersTable.styles'

type TUsersTable = {
  filtersSelected: TFilters | Record<string, never>
}

export const UsersTable: FC<TUsersTable> = ({ filtersSelected }) => {
  const { t } = useTranslation()

  const [filters, setFilters] = useState<TFilters>({})

  const { isLoading, isError, data: users } = useGetUsers(filters)

  const [selectedStatus, setSelectedStatus] = useState<string | undefined>(
    undefined
  )

  const [selectedUsers, setSelectedUsers] = useState<TUserData[]>([])

  const { changeUserStatus } = useUpdateUser()

  useEffect(() => {
    setFilters(filtersSelected)
  }, [filtersSelected])

  const handleStatus = (id: string, status: string) => {
    const updatedStatus = status === 'ACTIVE' ? 'BLOCKED' : 'ACTIVE'

    const updatedUser = {
      id,
      status: updatedStatus,
    }
    changeUserStatus.mutate(updatedUser)
  }

  const handleSelectedUsers = (allSelectedUsers: TUserData[]) => {
    // TO DO: Add action to do after selection
    // eslint-disable-next-line no-console
    console.log('allSelectedUsers', allSelectedUsers)
  }

  useEffect(() => {
    if (selectedUsers?.length > 0) {
      handleSelectedUsers(selectedUsers)
    } else {
      handleSelectedUsers([])
      setSelectedStatus(undefined)
    }
  }, [selectedUsers])

  const changeSelection = (
    e: ChangeEvent<HTMLInputElement>,
    id: string,
    status: string
  ) => {
    if (e.target.checked) {
      setSelectedStatus(status)
      const userSelected: TUserData | undefined = users?.find(
        (user) => user.id === id
      )
      const addUsers = [...selectedUsers]
      if (userSelected) {
        addUsers.push(userSelected)
      }
      setSelectedUsers(addUsers)

      return addUsers
    }

    const userUnselected = users?.find((user) => user.id === id)
    const removeUsers = selectedUsers.filter((user) => user !== userUnselected)
    setSelectedUsers(removeUsers)

    return removeUsers
  }

  const columHelper = createColumnHelper<TUserData>()

  const columns: ColumnDef<TUserData, string>[] = [
    columHelper.accessor('id', {
      header: '',
      cell: ({ row }) => {
        const id: string = row.getValue('id')
        const name: string = row.getValue('name')
        const status: string = row.getValue('status')
        let isDisabled: boolean | undefined

        if (selectedStatus && selectedStatus !== status) {
          isDisabled = true
        } else {
          isDisabled = undefined
        }

        return (
          <Checkbox
            id={id}
            label={name}
            hiddenLabel
            onChange={(e) =>
              handleSelectedUsers(changeSelection(e, id, status))
            }
            defaultChecked={selectedUsers?.some(
              (checkedUser) => checkedUser.id === id
            )}
            disabled={isDisabled}
          />
        )
      },
    }),
    columHelper.accessor('name', {
      header: `${t('Nombre')}`,
      cell: ({ row }) => {
        const name: string = row.getValue('name')
        const status: string = row.getValue('status')
        let isDisabled: boolean | undefined

        if (selectedStatus && selectedStatus !== status) {
          isDisabled = true
        } else {
          isDisabled = undefined
        }
        return <DisabledStyled disabled={isDisabled}>{name}</DisabledStyled>
      },
    }),
    columHelper.accessor('dni', {
      header: 'DNI/NIE',
      cell: ({ row }) => {
        const dni: string = row.getValue('dni')
        const status: string = row.getValue('status')
        let isDisabled: boolean | undefined

        if (selectedStatus && selectedStatus !== status) {
          isDisabled = true
        } else {
          isDisabled = undefined
        }
        return <DisabledStyled disabled={isDisabled}>{dni}</DisabledStyled>
      },
    }),
    columHelper.accessor('itineraryName', {
      header: `${t('Especialización')}`,
      cell: ({ row }) => {
        const itineraryName: string = row.getValue('itineraryName')
        const status: string = row.getValue('status')
        let isDisabled: boolean | undefined

        if (selectedStatus && selectedStatus !== status) {
          isDisabled = true
        } else {
          isDisabled = undefined
        }
        return (
          <DisabledStyled disabled={isDisabled}>{itineraryName}</DisabledStyled>
        )
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
        let isDisabled: boolean | undefined
        let displayedStatus: string = ''

        if (selectedStatus && selectedStatus !== status) {
          isDisabled = true
        } else {
          isDisabled = undefined
        }

        if (status === 'PENDING') {
          displayedStatus = t('pendiente')
        } else if (status === 'BLOCKED') {
          displayedStatus = t('bloqueado')
        } else {
          displayedStatus = t('activo')
        }
        return (
          <DisabledStyled disabled={isDisabled}>
            <StatusStyled status={status}>{displayedStatus}</StatusStyled>
          </DisabledStyled>
        )
      },
    }),
    columHelper.accessor('createdAt', {
      header: `${t('Fecha alta')}`,
      cell: ({ row }) => {
        const createdAt = row.getValue('createdAt')
        const status: string = row.getValue('status')
        const formattedDate = new Date(createdAt as string).toLocaleDateString()
        let isDisabled: boolean | undefined

        if (selectedStatus && selectedStatus !== status) {
          isDisabled = true
        } else {
          isDisabled = undefined
        }

        return (
          <DisabledStyled disabled={isDisabled}>{formattedDate}</DisabledStyled>
        )
      },
    }),

    columHelper.accessor('role', {
      header: `${t('Rol')}`,
      cell: ({ row }) => {
        const role: string = row.getValue('role')
        const status: string = row.getValue('status')
        let isDisabled: boolean | undefined
        let displayedRole: string = ''

        if (selectedStatus && selectedStatus !== status) {
          isDisabled = true
        } else {
          isDisabled = undefined
        }

        if (role === 'ADMIN') {
          displayedRole = t('administrador')
        } else if (role === 'REGISTERED') {
          displayedRole = t('registrado')
        } else {
          displayedRole = t('mentor')
        }

        return (
          <DisabledStyled disabled={isDisabled}>{displayedRole}</DisabledStyled>
        )
      },
    }),

    columHelper.display({
      id: 'actions',
      header: () => (
        <ActionsHeader align="end">
          <CellStyled>{t('Acciones')}</CellStyled>
        </ActionsHeader>
      ),
      cell: ({ row }) => {
        const status: string = row.getValue('status')
        const id: string = row.getValue('id')
        let isDisabled: boolean | undefined
        let buttonTxt: string = ''

        if (selectedStatus && selectedStatus !== status) {
          isDisabled = true
        } else {
          isDisabled = undefined
        }

        if (status === 'PENDING') {
          buttonTxt = t('Aceptar')
        } else if (status === 'BLOCKED') {
          buttonTxt = t('Desbloquear')
        } else {
          buttonTxt = t('Bloquear')
        }

        return (
          <ActionsContainer
            direction="row"
            justify="flex-end"
            gap={dimensions.spacing.xs}
          >
            <ButtonStyled
              size="small"
              outline
              disabled={isDisabled}
              onClick={() => handleStatus(id, status)}
            >
              {buttonTxt}
            </ButtonStyled>
            <DeleteButton size="small" outline disabled={isDisabled}>
              <DeleteIcon src={icons.deleteIcon} alt="delete-icon" />
            </DeleteButton>
          </ActionsContainer>
        )
      },
    }),
  ]

  if (isLoading) return <Spinner size="medium" role="status" />
  if (isError) return <p>{t('Ha habido un error...')}</p>
  return (
    <TableContainer>
      <Table
        columns={columns}
        data={users || []}
        noResultsMessage={t('No hay usuarios para mostrar')}
      />
    </TableContainer>
  )
}
