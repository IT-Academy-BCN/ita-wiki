import styled from 'styled-components'
import { FC, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { urls } from '../../constants'
import { colors, device } from '../../styles'
import { TUserData } from '../../types'
import { useGetUsers } from '../../hooks/useGetUsers'
import { TINDEX } from '../../locales/translationIndex'

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
  const queryClient = useQueryClient()
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

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error fetching users</div>
  }

  const updateUserStatus = async (user: TUserData) => {
    try {
      const updatedStatus = user.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE'
      const updatedUser = {
        ...user,
        status: updatedStatus,
      }

      const response = await fetch(urls.users, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      })
      if (!response.ok) {
        throw new Error('Failed to update user status')
      }
      queryClient.setQueryData<TUserData[]>(['users'], (prevData) => {
        if (prevData) {
          return prevData.map((u) =>
            u.id === updatedUser.id ? { ...u, status: updatedStatus } : u
          )
        }
        return prevData
      })
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
    }
  }

  return (
    <UserListContainer>
      <h1>{t(TINDEX.USER_LIST)}</h1>
      <p>{t(TINDEX.SEARCH_BY_DNI)}</p>
      <SearchInput
        type="text"
        id="search"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder={t(TINDEX.ENTER_DNI)}
      />
      <Table>
        <TableHead>
          <tr>
            <TableHeader>{t(TINDEX.NAME)}</TableHeader>
            <TableHeader>{t(TINDEX.DNI_NIE)}</TableHeader>
            <TableHeader>{t(TINDEX.EMAIL)}</TableHeader>
            <TableHeader>{t(TINDEX.STATUS)}</TableHeader>
            <TableHeader>{t(TINDEX.CHANGE_STATUS)}</TableHeader>
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
                        {t(TINDEX.DEACTIVATE)}
                      </DeactivateBtn>
                    ) : (
                      <ActivateBtn
                        data-testid="status-activar"
                        onClick={() => updateUserStatus(user)}
                      >
                        {t(TINDEX.ACTIVATE)}
                      </ActivateBtn>
                    )}
                  </TableCell>
                </TableRow>
              ))
            : 'Error'}
        </TableBody>
      </Table>
    </UserListContainer>
  )
}

export { AccountAdmin }
