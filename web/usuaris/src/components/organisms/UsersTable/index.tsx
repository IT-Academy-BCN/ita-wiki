/* eslint-disable react/no-unstable-nested-components */
import { ChangeEvent, FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { Checkbox, Spinner, dimensions } from '@itacademy/ui'
import { DeleteConfirmationModal, Table } from '../../molecules'
import { TFilters, TUserData, UserRole, UserStatus } from '../../../types'
import { icons } from '../../../assets/icons'
import { useGetUsers, useUpdateUser } from '../../../hooks'
import {
  ActionsContainer,
  ActionsHeader,
  ButtonStyled,
  DeleteButton,
  DeleteIcon,
  DisabledStyled,
  StatusStyled,
  TableContainer,
} from './UsersTable.styles'
import { useAuth } from '../../../context/AuthProvider'

type TUsersTable = {
  filtersSelected: TFilters | Record<string, never>
  selectedStatus: UserStatus | undefined
  setSelectedStatus: (selectedStatus: UserStatus | undefined) => void
  handleSelectedUsers: (selectedUsersIds: string[]) => void
}

export const UsersTable: FC<TUsersTable> = ({
  filtersSelected,
  selectedStatus,
  setSelectedStatus,
  handleSelectedUsers,
}) => {
  const { t } = useTranslation()

  const [filters, setFilters] = useState<TFilters>({})

  const { isLoading, isError, data: users } = useGetUsers(filters)

  const [selectedUsersIds, setSelectedUsersIds] = useState<string[]>([])

  const { changeUserStatus } = useUpdateUser()

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const [idToDelete, setIdToDelete] = useState<string>('')

  const { user } = useAuth()

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

  useEffect(() => {
    if (selectedUsersIds?.length > 0) {
      handleSelectedUsers(selectedUsersIds)
    } else {
      handleSelectedUsers([])
      setSelectedStatus(undefined)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUsersIds])

  useEffect(() => {
    if (selectedStatus === undefined) setSelectedUsersIds([])
  }, [selectedStatus])

  useEffect(() => {
    setSelectedStatus(undefined)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters])

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
      const addUsers = [...selectedUsersIds]
      if (userSelected) {
        addUsers.push(userSelected.id)
      }
      setSelectedUsersIds(addUsers)

      return addUsers
    }

    const userUnselected = users?.find((user) => user.id === id)
    const removeUsers = selectedUsersIds.filter(
      (user) => user !== userUnselected?.id
    )
    setSelectedUsersIds(removeUsers)

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
        const isDisabled =
          (!!selectedStatus && selectedStatus !== status) || !!deletedAt

        return (
          <Checkbox
            id={id}
            label={name}
            hiddenLabel
            onChange={(e) =>
              handleSelectedUsers(changeSelection(e, id, status))
            }
            defaultChecked={selectedUsersIds?.some(
              (checkedUser) => checkedUser === id
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
        const isDisabled = !!selectedStatus && selectedStatus !== status

        return <DisabledStyled disabled={isDisabled}>{name}</DisabledStyled>
      },
    }),
    columHelper.accessor('dni', {
      header: 'DNI/NIE',
      cell: ({ row }) => {
        const dni: string = row.getValue('dni')
        const status: UserStatus = row.getValue('status')
        const isDisabled = !!selectedStatus && selectedStatus !== status

        return <DisabledStyled disabled={isDisabled}>{dni}</DisabledStyled>
      },
    }),
    columHelper.accessor('itineraryName', {
      header: `${t('Especialización')}`,
      cell: ({ row }) => {
        const itineraryName: string = row.getValue('itineraryName')
        const status: UserStatus = row.getValue('status')
        const isDisabled = !!selectedStatus && selectedStatus !== status

        return (
          <DisabledStyled disabled={isDisabled}>{itineraryName}</DisabledStyled>
        )
      },
    }),
    columHelper.accessor('status', {
      header: `${t('Estado')}`,
      cell: ({ row }) => {
        let status: UserStatus = row.getValue('status')
        const isDisabled = !!selectedStatus && selectedStatus !== status
        const { deletedAt } = row.original
        if (deletedAt) status = UserStatus.DELETED

        return (
          <DisabledStyled disabled={isDisabled}>
            <StatusStyled isDeleted={deletedAt !== null} status={status}>
              {t(`${status}`)}
            </StatusStyled>
          </DisabledStyled>
        )
      },
    }),
    columHelper.accessor('createdAt', {
      header: `${t('Fecha alta')}`,
      cell: ({ row }) => {
        const createdAt = row.getValue('createdAt')
        const status: UserStatus = row.getValue('status')
        const isDisabled = !!selectedStatus && selectedStatus !== status
        const formattedDate = new Date(createdAt as string).toLocaleDateString()

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
        const isDisabled = !!selectedStatus && selectedStatus !== status

        return <DisabledStyled disabled={isDisabled}>{t(role)}</DisabledStyled>
      },
    }),
    columHelper.display({
      id: 'actions',
      header: () => <ActionsHeader>{t('Acciones')}</ActionsHeader>,
      cell: ({ row }) => {
        const status: UserStatus = row.getValue('status')
        const id: string = row.getValue('id')
        const { deletedAt } = row.original
        const isDisabled = !!selectedStatus || !!deletedAt
        let buttonTxt: string = ''

        if (deletedAt) {
          buttonTxt = t('Eliminado')
        } else if (status === UserStatus.PENDING) {
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
            {user?.role === UserRole.ADMIN && (
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
            )}
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
