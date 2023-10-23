import { vi } from 'vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen, waitFor, fireEvent } from '../test-utils'
import { TAuthContext, useAuth } from '../../context/AuthProvider'
import { UsersManager } from '../../components/organisms/UsersManager'

const mockUsers = [
  {
    id: '2',
    email: 'user1@example.com',
    dni: '12345678',
    name: 'User Two',
    status: 'ACTIVE',
    role: 'user',
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
  }
]

vi.mock('/api/users', () => mockUsers)
const queryClient = new QueryClient()

const renderWithQueryClient = (component: React.ReactNode) =>
  render(
    <QueryClientProvider client={queryClient}>{component}</QueryClientProvider>
  )

beforeEach(() => {
  vi.mock('../../context/AuthProvider', async () => {
    const actual: Record<number, unknown> = await vi.importActual(
      '../../context/AuthProvider'
    )
    return {
      ...actual,
      useAuth: vi.fn(),
    }
  })
})

afterEach(() => {
  vi.resetAllMocks()
})

describe('UsersManager component', () => {
  it('renders for mentor roles and does not allow editing', () => {
    vi.mocked(useAuth).mockReturnValue({
      user: {
        name: 'MentorName',
        avatar: 'MentorAvatar',
        role: 'MENTOR',
      },
    } as TAuthContext)
    render(<UsersManager />)

    expect(screen.getByText('Users Manager')).toBeInTheDocument()
    expect(screen.queryByText('AccountAdmin')).not.toBeInTheDocument()
  })

  it('renders for admin roles and allows editing', async () => {
    vi.mocked(useAuth).mockReturnValue({
      user: {
        name: 'AdminName',
        avatar: 'AdminAvatar',
        role: 'ADMIN',
      },
    } as TAuthContext)
    queryClient.setQueryData(['users'], mockUsers)
    renderWithQueryClient(<UsersManager />)

    expect(screen.getByText('Lista de usuarios')).toBeInTheDocument()
    expect(screen.queryByText('Error fetching users')).toBeNull()

    const user2 = screen.getByText('User Two')
    expect(user2).toBeInTheDocument()

    const searchInput = screen.getByPlaceholderText('Escribe el DNI')
    fireEvent.change(searchInput, { target: { value: '12345678' } })

    await waitFor(() => {
      expect(screen.queryByText('User Two')).toBeInTheDocument()
    })

    const statusButton = screen.getByTestId('status-desactivar')
    fireEvent.click(statusButton)

    await waitFor(() =>
      expect(screen.getByText('Desactivar')).toBeInTheDocument()
    )
  })
})
