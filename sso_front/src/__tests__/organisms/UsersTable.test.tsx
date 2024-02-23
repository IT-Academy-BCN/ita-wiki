import { render, screen } from '@testing-library/react'
import { UsersTable } from '../../components/organisms'
import { type TUser } from '../../pages/Home'

describe('UsersTable', () => {
  const mockUsers: TUser[] = [
    {
      name: 'Ona Sitgar',
      specialization: 'Node',
      status: 'pendiente',
      registrationDate: '05/11/2023',
    },
    {
      name: 'Marc Bofill',
      specialization: 'Node',
      status: 'activo',
      registrationDate: '05/11/2023',
    },
    {
      name: 'Montserrat Capdevila',
      specialization: 'Node',
      status: 'bloqueado',
      registrationDate: '05/11/2023',
    },
  ]
  it('renders correctly', () => {
    render(<UsersTable users={mockUsers} />)

    expect(screen.getByText(/nombre/i)).toBeInTheDocument()
    expect(screen.getByText(/especialización/i)).toBeInTheDocument()
    expect(screen.getByText(/estado/i)).toBeInTheDocument()
    expect(screen.getByText(/fecha alta/i)).toBeInTheDocument()
    expect(screen.getByText(/acciones/i)).toBeInTheDocument()
    expect(screen.getByText(/ona sitgar/i)).toBeInTheDocument()
  })

  it('displays the correct status color', () => {
    render(<UsersTable users={mockUsers} />)

    const pending = screen.getByText(/pendiente/i)
    const active = screen.getByText(/activo/i)
    const locked = screen.getByText(/bloqueado/i)

    expect(pending).toHaveStyle('background-color: #FCD9D9')
    expect(active).toHaveStyle('background-color: #C6F1DA')
    expect(locked).toHaveStyle('background-color: #FCDEC0')
  })

  it('displays the correct button text', () => {
    render(<UsersTable users={mockUsers} />)

    const buttonAccept = screen.getByText('Aceptar')
    expect(buttonAccept).toBeInTheDocument()
    expect(buttonAccept.closest('tr')).toHaveTextContent(/pendiente/i)

    const buttonLock = screen.getByText('Bloquear')
    expect(buttonLock).toBeInTheDocument()
    expect(buttonLock.closest('tr')).toHaveTextContent(/activo/i)

    const buttonUnlock = screen.getByText('Desbloquear')
    expect(buttonUnlock).toBeInTheDocument()
    expect(buttonUnlock.closest('tr')).toHaveTextContent(/bloqueado/i)
  })
})
