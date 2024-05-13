/* eslint-disable react/no-unstable-nested-components */
import { ChangeEvent, FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { Checkbox, Spinner, dimensions } from '@itacademy/ui'
import { DeleteConfirmationModal, Table } from '../../molecules'
import { TFilters, TUserData, UserStatus } from '../../../types'
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
import { UserRole } from '../../../types/types'

type TUsersTable = {
  filtersSelected: TFilters | Record<string, never>
}

export const UsersTable: FC<TUsersTable> = ({ filtersSelected }) => {
  const { t } = useTranslation()

  const [filters, setFilters] = useState<TFilters>({})

  const { isLoading, isError, data: users } = useGetUsers(filters)

  const [selectedStatus, setSelectedStatus] = useState<UserStatus | undefined>(
    undefined
  )

  const [selectedUsers, setSelectedUsers] = useState<TUserData[]>([])

  const { changeUserStatus } = useUpdateUser()

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const [idToDelete, setIdToDelete] = useState<string>('')

  useEffect(() => {
    setFilters(filtersSelected)
  }, [filtersSelected])

  const handleStatus = (id: string, status: UserStatus) => {
    const updatedStatus =
      status === UserStatus.ACTIVE ? UserStatus.BLOCKED : UserStatus.ACTIVE

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
    status: UserStatus
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
        const status: UserStatus = row.getValue('status')
        const { deletedAt } = row.original
        let isDisabled: boolean | undefined

        if ((selectedStatus && selectedStatus !== status) || deletedAt) {
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
        const status: UserStatus = row.getValue('status')
        const { deletedAt } = row.original
        let isDisabled: boolean | undefined

        if ((selectedStatus && selectedStatus !== status) || deletedAt) {
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
        const status: UserStatus = row.getValue('status')
        const { deletedAt } = row.original
        let isDisabled: boolean | undefined

        if ((selectedStatus && selectedStatus !== status) || deletedAt) {
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
        const status: UserStatus = row.getValue('status')
        const { deletedAt } = row.original
        let isDisabled: boolean | undefined

        if ((selectedStatus && selectedStatus !== status) || deletedAt) {
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
        const status: UserStatus = row.getValue('status')
        const { deletedAt } = row.original
        let isDisabled: boolean | undefined

        if ((selectedStatus && selectedStatus !== status) || deletedAt) {
          isDisabled = true
        } else {
          isDisabled = undefined
        }

        return (
          <DisabledStyled disabled={isDisabled}>
            <StatusStyled status={status}>{t(`${status}`)}</StatusStyled>
          </DisabledStyled>
        )
      },
    }),
    columHelper.accessor('createdAt', {
      header: `${t('Fecha alta')}`,
      cell: ({ row }) => {
        const createdAt = row.getValue('createdAt')
        const status: UserStatus = row.getValue('status')
        const formattedDate = new Date(createdAt as string).toLocaleDateString()
        const { deletedAt } = row.original
        let isDisabled: boolean | undefined

        if ((selectedStatus && selectedStatus !== status) || deletedAt) {
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
        const role: UserRole = row.getValue('role')
        const status: UserStatus = row.getValue('status')
        const { deletedAt } = row.original
        let isDisabled: boolean | undefined

        if ((selectedStatus && selectedStatus !== status) || deletedAt) {
          isDisabled = true
        } else {
          isDisabled = undefined
        }

        return <DisabledStyled disabled={isDisabled}>{t(role)}</DisabledStyled>
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
        const status: UserStatus = row.getValue('status')
        const id: string = row.getValue('id')
        const { deletedAt } = row.original
        let isDisabled: boolean | undefined
        let buttonTxt: string = ''

        if ((selectedStatus && selectedStatus !== status) || deletedAt) {
          isDisabled = true
        } else {
          isDisabled = undefined
        }

        if (status === UserStatus.PENDING) {
          buttonTxt = t('Aceptar')
        } else if (status === UserStatus.BLOCKED) {
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
            <DeleteButton
              data-testid="delete-button"
              size="small"
              outline
              disabled={isDisabled}
              onClick={() => {
                setIdToDelete(id)
                setIsModalOpen(!isModalOpen)
              }}
            >
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
      <DeleteConfirmationModal
        open={isModalOpen}
        toggleModal={() => setIsModalOpen(false)}
        idToDelete={idToDelete}
      />
    </TableContainer>
  )
}
