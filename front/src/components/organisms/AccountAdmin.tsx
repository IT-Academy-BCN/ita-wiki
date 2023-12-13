import styled from 'styled-components'
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { colors, device } from '../../styles'
import { TUserData } from '../../types'
import { useGetUsers, useUpdateUserStatus } from '../../hooks'
import { Spinner } from '../atoms'

const UserListContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const Table = styled.table`
  padding: 10px;
  box-shadow: 0px 0px 12px rgb(0, 0, 0, 0.1);
  border-collapse: collapse;
  width: 112%;
  table-layout: fixed;

  @media ${device.Laptop} {
    width: 100%;
  }
`

const TableHead = styled.thead`
  background-color: #f2f2f2;
`

const TableHeader = styled.th`
  padding: 10px;
`

const TableBody = styled.tbody``

const TableRow = styled.tr`
  border-bottom: 2px dotted rgb(0, 0, 0, 0.1);
`
const TableCellNames = styled.td`
  padding: 5px 5px 5px 10px;
  margin: 0;
  word-wrap: break-word;
  font-size: 14px;
`

const TableCell = styled.td`
  padding: 5px 5px 5px 0px;
  text-align: center;
  word-wrap: break-word;
  font-size: 14px;
`
const SearchInput = styled.input`
  margin-left: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
`
const ActivateBtn = styled.button`
  background-color: rgb(39, 174, 96, 0.6);
  border: 1px solid rgb(0, 0, 0, 0.5);
  border-radius: 5px;
  max-width: 93px;
  padding: 5.5px;
  font-size: 13.2px;

  &:hover {
    cursor: pointer;
    background-color: ${colors.success};
  }

  @media only ${device.Desktop} {
    min-width: 100px;
    padding: 12px;
  }

  @media only ${device.Tablet} {
    width: 65px;
    margin: 0 -2px 0 -7px;
    padding: 7.5px;
  }
`
const DeactivateBtn = styled.button`
  background-color: rgb(226, 170, 59, 0.6);
  border: 1px solid rgb(0, 0, 0, 0.5);
  border-radius: 5px;
  max-width: 93px;
  padding: 5.5px;
  font-size: 13.2px;

  &:hover {
    cursor: pointer;
    background-color: ${colors.warning};
  }

  @media only ${device.Desktop} {
    min-width: 100px;
    padding: 12px;
  }

  @media only ${device.Tablet} {
    width: 70px;
    margin: 0 -1px 0 -7px;
    padding: 7.5px;
  }
`

const AccountAdmin: FC = () => {
  const { t } = useTranslation()
  const { isLoading, isError, data: users } = useGetUsers()
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  let filteredUsers: TUserData[] | null = null

  if (!isLoading && users) {
    if (searchTerm.trim() !== '') {
      filteredUsers = users.filter((user) =>
        user.dni.includes(searchTerm.trim())
      )
    } else {
      filteredUsers = users
    }
  }

  const { changeUserStatus } = useUpdateUserStatus()

  const updateUserStatus = (user: TUserData) => {
    const updatedStatus = user.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE'
    const updatedUser = {
      id: user.id,
      status: updatedStatus,
    }

    changeUserStatus.mutate(updatedUser)
  }

  if (isLoading) return <Spinner size="medium" role="status" />
  if (isError) return <p>{t('Ha habido un error...')}</p>

  return (
    <UserListContainer>
      <h1>{t('Lista de usuarios')}</h1>
      <p>{t('Buscar por DNI:')}</p>
      <SearchInput
        type="text"
        id="search"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder={t('Introduce el DNI')}
      />
      <Table>
        <TableHead>
          <tr>
            <TableHeader>{t('Nombre')}</TableHeader>
            <TableHeader>{t('DNI')}</TableHeader>
            <TableHeader>{t('Email')}</TableHeader>
            <TableHeader>{t('Estado')}</TableHeader>
            <TableHeader>{t('Cambiar estado')}</TableHeader>
          </tr>
        </TableHead>
        <TableBody>
          {filteredUsers
            ? filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCellNames>{user.name}</TableCellNames>
                  <TableCell>{user.dni}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.status}</TableCell>
                  <TableCell>
                    {user.status === 'ACTIVE' ? (
                      <DeactivateBtn
                        data-testid="status-desactivar"
                        onClick={() => updateUserStatus(user)}
                      >
                        {t('Desactivar')}
                      </DeactivateBtn>
                    ) : (
                      <ActivateBtn
                        data-testid="status-activar"
                        onClick={() => updateUserStatus(user)}
                      >
                        {t('Activar')}
                      </ActivateBtn>
                    )}
                  </TableCell>
                </TableRow>
              ))
            : null}
        </TableBody>
      </Table>
    </UserListContainer>
  )
}

export { AccountAdmin }
