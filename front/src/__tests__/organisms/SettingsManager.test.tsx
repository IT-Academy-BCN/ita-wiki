import { vi } from 'vitest'
import { rest } from 'msw'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen, waitFor, fireEvent } from '../test-utils'
import { TAuthContext, useAuth } from '../../context/AuthProvider'
import { SettingsManager } from '../../components/organisms'
import { mswServer } from '../setup'
import { errorHandlers } from '../../__mocks__/handlers'
import { urls } from '../../constants'

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
vi.mock('/api/v1/users', () => mockUsers)
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
  mswServer.resetHandlers()
  vi.resetAllMocks()
})

afterAll(() => mswServer.close())

describe('SettingsManager component', () => {
  it('renders Temes and Usuaris tabs correctly for mentor roles or higher', () => {
    render(<SettingsManager />)

    expect(screen.getByText('Temes')).toBeInTheDocument()
    expect(screen.getByText(/usuaris/i)).toBeInTheDocument()
    expect(
      screen.getByText(
        /No hi ha temes disponibles. *Accedeix des d'una categoria per veure o gestionar els temes./
      )
    ).toBeInTheDocument()
    expect(screen.queryByText('Users Manager')).not.toBeInTheDocument()
  })

  it('changes content tab according to click on menu tab', () => {
    render(<SettingsManager />)
  
    fireEvent.click(screen.getByText('Usuaris'))
  
    expect(screen.getByText(/Administrador d'Usuaris/)).toBeInTheDocument()
    
    fireEvent.click(screen.getByText('Temes'))
  
    expect(screen.getByText(/No hi ha temes disponibles./)).toBeInTheDocument()
  })
})

describe('User Permissions', () => {
  it('renders an error when the fetching process fails', async () => {
    vi.mocked(useAuth).mockReturnValue({
      user: {
        name: 'AdminName',
        avatar: 'AdminAvatar',
        role: 'ADMIN',
      },
    } as TAuthContext)
    mswServer.use(...errorHandlers)

    render(<SettingsManager />)

    fireEvent.click(screen.getByText('Usuaris'))

    await waitFor(() => {
      expect(screen.getByText('Error fetching users')).toBeInTheDocument()
    })
  })

  it('shows a message to mentors when they try to visualize the Usuaris content', async () => {
    mswServer.use(
      rest.patch(urls.patchTopics, (req, res, ctx) => res(ctx.status(403)))
    )
    render(<SettingsManager />)
  
    fireEvent.click(screen.getByText('Usuaris'))
    
    await waitFor(() => {
      expect(screen.getByText('No tens permisos suficients per accedir al contingut.')).toBeInTheDocument()
    })
  })

  it('allows admin to find users by DNI', async () => {
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
  
    const searchInput = screen.getByPlaceholderText('Escribe el DNI')

    fireEvent.change(searchInput, { target: { value: '12345678' } })

    await waitFor(() =>
      expect(screen.getByText('User One')).toBeInTheDocument()
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
