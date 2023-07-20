import styled from 'styled-components'
import { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import { paths } from '../constants'
import { useQuery } from '@tanstack/react-query'
import { colors } from '../styles'

interface User {
  id: string
  email: string
  dni: string
  name: string
  status: string
  role: string
  createdAt: string
  updatedAt: string
}

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
const DeleteBtn = styled.button`
  background-color: rgb(191, 67, 67, 0.6);
  border: 1px solid rgb(0, 0, 0, 0.5);
  border-radius: 5px;
  padding: 10px;

  &:hover {
    cursor: pointer;
    background-color: rgb(191, 67, 67);
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

const fetchUsers = async () => {
  const response = await fetch('/api/v1/users')
  const data = await response.json()
  return data
}

const AccountAdmin: FC = () => {
  const {
    data: users,
    isLoading,
    isError,
  } = useQuery<User[]>(['users'], fetchUsers)

  const [searchTerm, setSearchTerm] = useState('')

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  let filteredUsers: User[] = []

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

  const updateUserStatus = async (user: User) => {
    try {
      const updatedStatus = user.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE'
      const updatedUser = {
        ...user,
        status: updatedStatus,
        createdAt: new Date(user.createdAt),
        updatedAt: new Date(),
      }

      const response = await fetch('/api/v1/users', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      })

      if (!response.ok) {
        throw new Error('Failed to update user status')
      }
      console.log('User status updated successfully')
    } catch (error) {
      console.error('Error updating user status', error)
    }
  }

  return (
    <UserListContainer>
      <Link to={paths.home}>
        <HomeBtn>Volver</HomeBtn>
      </Link>
      <h1>Lista de usuarios</h1>
      <label htmlFor="search">Buscar por DNI:</label>
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
            <TableHeader></TableHeader>
            <TableHeader>Eliminar usuario</TableHeader>
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
                  <DeactivateBtn onClick={() => updateUserStatus(user)}>
                    Desactivar
                  </DeactivateBtn>
                ) : (
                  <ActivateBtn onClick={() => updateUserStatus(user)}>
                    Activatar
                  </ActivateBtn>
                )}
              </TableCell>
              <TableCell>
                <DeleteBtn>Eliminar</DeleteBtn>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </UserListContainer>
  )
}

export { AccountAdmin }
