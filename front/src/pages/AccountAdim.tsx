import styled from 'styled-components'
import { FC, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { paths, urls } from '../constants'
import { colors } from '../styles'
import { TUser } from '../types'
import { useGetUsers } from '../hooks/useGetUsers'

const UserListContainer = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const Table = styled.table`
  width: 70%;
  padding: 10px;
  box-shadow: 0px 0px 12px rgb(0, 0, 0, 0.1);
  border-collapse: collapse;
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
  padding: 10px 10px 10px 20px;
`

const TableCell = styled.td`
  padding: 10px;
  text-align: center;
`
const SearchInput = styled.input`
  margin-left: 10px;
  margin-bottom: 20px;
`
const ActivateBtn = styled.button`
  background-color: rgb(39, 174, 96, 0.6);
  border: 1px solid rgb(0, 0, 0, 0.5);
  border-radius: 5px;
  padding: 10px;
  width: 100px;

  &:hover {
    cursor: pointer;
    background-color: ${colors.success};
  }
`
const DeactivateBtn = styled.button`
  background-color: rgb(226, 170, 59, 0.6);
  border: 1px solid rgb(0, 0, 0, 0.5);
  border-radius: 5px;
  padding: 10px;
  width: 100px;

  &:hover {
    cursor: pointer;
    background-color: ${colors.warning};
  }
`

const HomeBtn = styled.button`
  position: absolute;
  top: 10px;
  left: 10px;
  border: 1px solid rgb(0, 0, 0, 0.5);
  border-radius: 5px;
  padding: 10px;

  &:hover {
    cursor: pointer;
    background-color: rgb(0, 0, 0, 0.1);
    box-shadow: 0px 0px 5px rgb(0, 0, 0, 0.1);
  }
`

const AccountAdmin: FC = () => {
  const { isLoading, isError, data: users } = useGetUsers()
  const queryClient = useQueryClient()
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  let filteredUsers: TUser[] = []

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

  const updateUserStatus = async (user: TUser) => {
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
      queryClient.setQueryData<TUser[]>(['users'], (prevData) => {
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
      <Link to={paths.home}>
        <HomeBtn>Volver</HomeBtn>
      </Link>
      <h1>Lista de usuarios</h1>
      <p>Buscar por DNI:</p>
      <SearchInput
        type="text"
        id="search"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Escribe el DNI"
      />
      <Table>
        <TableHead>
          <tr>
            <TableHeader>Nombre</TableHeader>
            <TableHeader>DNI</TableHeader>
            <TableHeader>Email</TableHeader>
            <TableHeader>Estado</TableHeader>
            <TableHeader>Cambiar estado</TableHeader>
          </tr>
        </TableHead>
        <TableBody>
          {filteredUsers.map((user) => (
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
                    Desactivar
                  </DeactivateBtn>
                ) : (
                  <ActivateBtn
                    data-testid="status-activar"
                    onClick={() => updateUserStatus(user)}
                  >
                    Activar
                  </ActivateBtn>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </UserListContainer>
  )
}

export { AccountAdmin }
