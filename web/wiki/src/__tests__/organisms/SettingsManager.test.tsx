import { vi } from 'vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen, waitFor, fireEvent } from '../test-utils'
import { TAuthContext, useAuth } from '../../context/AuthProvider'
import { SettingsManager } from '../../components/organisms'
import { errorHandlers } from '../../__mocks__/handlers'
import { server } from '../../__mocks__/server'

const mockUsers = [
  {
    id: '1',
    email: 'user1@example.com',
    dni: '12345678',
    name: 'User One',
    itineraryId: 'react',
    status: 'ACTIVE',
    role: 'REGISTERED',
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
      name: 'AdminName',
      role: 'ADMIN',
    },
  } as TAuthContext)
})

afterEach(() => {
  server.resetHandlers()
  vi.resetAllMocks()
})

afterAll(() => server.close())

describe('SettingsManager component', () => {
  it('renders Temes tab correctly for admin role', () => {
    render(<SettingsManager />)

    expect(screen.getByText('Temes')).toBeInTheDocument()
    expect(
      screen.getByText(
        /No hi ha temes disponibles. *Accedeix des d'una categoria per veure o gestionar els temes./
      )
    ).toBeInTheDocument()
    expect(screen.queryByText('Users Manager')).not.toBeInTheDocument()
  })

  it('filters out tabs that the mentor role is not authorized to view', async () => {
    vi.mocked(useAuth).mockReturnValue({
      user: {
        name: 'MentorName',
        role: 'MENTOR',
      },
    } as TAuthContext)

    render(<SettingsManager />)

    const tabs = screen.getAllByRole('button')

    expect(tabs.length).toBe(1)
    expect(tabs[0].textContent).toBe('Temes')

    expect(screen.queryByText('Usuaris')).not.toBeInTheDocument()
  })
})

describe('User Permissions', () => {
  it('renders Temes for mentors, but does not allow them to visualize Usuaris tab', () => {
    vi.mocked(useAuth).mockReturnValue({
      user: {
        name: 'MentorName',
        role: 'MENTOR',
      },
    } as TAuthContext)
    render(<SettingsManager />)

    expect(screen.queryByRole('button', { name: 'Temes' })).toBeInTheDocument()

    fireEvent.click(screen.getByText('Temes'))

    expect(screen.getByText(/No hi ha temes disponibles./)).toBeInTheDocument()

    expect(screen.queryByText('Usuaris')).toBeNull()
  })

  it.skip('allows admin to find users by DNI', async () => {
    queryClient.setQueryData(['users'], mockUsers)
    renderWithQueryClient(<SettingsManager />)

    fireEvent.click(screen.getByText('Usuaris'))

    const searchInput = screen.getByPlaceholderText('Escribe el DNI')

    fireEvent.change(searchInput, { target: { value: '12345678' } })

    await waitFor(() =>
      expect(screen.getByText('User One')).toBeInTheDocument()
    )
  })

  it.skip('renders an error when the fetching process fails', async () => {
    server.use(...errorHandlers)

    render(<SettingsManager />)

    fireEvent.click(screen.getByText('Usuaris'))

    await waitFor(() => {
      expect(screen.getByText('Error fetching users')).toBeInTheDocument()
    })
  })
})
