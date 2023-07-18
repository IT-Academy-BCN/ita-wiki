import styled from 'styled-components'
import { FC, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { paths } from '../constants'

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

const AccountAdmin: FC = () => {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://dev.api.itadirectory.eurecatacademy.org/api/v1/users');
      const data = await response.json();
      setUsers(data.data);
    } catch (error) {
      console.log('Error fetching users:', error);
    }
  };

  return (
    <div>
      <Link to={paths.home}>
        <button>home</button>
      </Link>
      <h1>User List</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export { AccountAdmin }
