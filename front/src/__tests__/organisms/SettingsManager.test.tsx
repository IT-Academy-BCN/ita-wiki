import { vi } from 'vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen, waitFor, fireEvent } from '../test-utils'
import { TAuthContext, useAuth } from '../../context/AuthProvider'
import { SettingsManager } from '../../components/organisms'

const mockUsers = [
  {
    id: '1',
    email: 'user1@example.com',
    dni: '12345678',
    name: 'User One',
    status: 'ACTIVE',
    role: 'user',
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
  },
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
  vi.mocked(useAuth).mockReturnValue({
    user: {
      name: 'MentorName',
      avatar: 'MentorAvatar',
      role: 'MENTOR',
    },
  } as TAuthContext)
})

afterEach(() => {
  vi.resetAllMocks()
})

describe('SettingsManager component', () => {
  it('renders Temes and Usuaris tabs correctly for mentor roles or higher', () => {
    render(<SettingsManager />)

    expect(screen.getByText('Temes')).toBeInTheDocument()
    expect(screen.getByText('Usuaris')).toBeInTheDocument()
  })

  it('changes content tab according to click on menu tab', async () => {
    render(<SettingsManager />)
  
    fireEvent.click(screen.getByText('Usuaris'))
  
    await waitFor(() => {
      expect(screen.getByText('Usuaris')).toBeInTheDocument()
    })
  
    expect(screen.queryByText(/No hi ha temes disponibles./)).not.toBeInTheDocument()
    
    fireEvent.click(screen.getByText('Temes'))
  
    await waitFor(() => {
      expect(screen.getByText('Temes')).toBeInTheDocument()
    })
  
    expect(screen.queryByText('Users Manager')).not.toBeInTheDocument()
  })
})

describe('User Permissions', () => {
  it('only allows admins to fetch users, and renders an error if the process fails', async () => {
    vi.mocked(useAuth).mockReturnValue({
      user: {
        name: 'AdminName',
        avatar: 'AdminAvatar',
        role: 'ADMIN',
      },
    } as TAuthContext)
    render(<SettingsManager />)
  
    fireEvent.click(screen.getByText('Usuaris'))
    
    const errorText = await screen.findByText('Error fetching users')
    expect(errorText).toBeInTheDocument()
  })

  it('does not allow lower permissions to see the results of the fetching process', async () => {
    render(<SettingsManager />)
  
    fireEvent.click(screen.getByText('Usuaris'))
    
    await waitFor(() => {
      const loadingText = screen.queryByText('Loading...')
      const errorText = screen.queryByText('Error fetching users')
      expect(loadingText).toBeNull()
      expect(errorText).toBeNull()
    })
  })

  it('allows admin to update user status when clicking on the status button', async () => {
    vi.mocked(useAuth).mockReturnValue({
      user: {
        name: 'AdminName',
        avatar: 'AdminAvatar',
        role: 'ADMIN',
      },
    } as TAuthContext)
    queryClient.setQueryData(['users'], mockUsers)
    renderWithQueryClient(<SettingsManager />)

    fireEvent.click(screen.getByText('Usuaris'))

    const user1 = await screen.findByText('User One')
    expect(user1).toBeInTheDocument()

    const statusButton = screen.getByTestId('status-desactivar')

    fireEvent.click(statusButton)

    await waitFor(() =>
      expect(
        screen.getByText('Desactivar')
      ).toBeInTheDocument()
    )
  })

  it('does not allow mentors to update user status', async () => {
    render(<SettingsManager />)
    fireEvent.click(screen.getByText('Usuaris'))

    await waitFor(() => {
      expect(screen.queryByTestId('status-desactivar')).toBeNull()
    })
  })
})
