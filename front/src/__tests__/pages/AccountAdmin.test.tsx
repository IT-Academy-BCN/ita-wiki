import { vi } from 'vitest'
import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen, fireEvent, waitFor } from '../test-utils'
import { AccountAdmin } from '../../components/organisms/AccountAdim'
import { mswServer } from '../setup'
import { errorHandlers } from '../../__mocks__/handlers'

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

afterEach(() => {
  mswServer.resetHandlers()
  vi.resetAllMocks()
})

afterAll(() => mswServer.close())

const renderWithQueryClient = (component: React.ReactNode) =>
  render(
    <QueryClientProvider client={queryClient}>{component}</QueryClientProvider>
  )

describe('AccountAdmin Component', () => {
  it('renders loading text while fetching users', async () => {
    render(<AccountAdmin />)
    const loadingText = screen.getByText('Loading...')
    expect(loadingText).toBeInTheDocument()
    await waitFor(() => {
      const resolvedText = screen.queryByText('Loading...')
      expect(resolvedText).toBeNull()
    })
  })
  it.skip('renders error text when fetching users fails', async () => {
    mswServer.use(...errorHandlers)
    render(<AccountAdmin />)
    const errorText = await screen.findByText('Error fetching users')
    expect(errorText).toBeInTheDocument()
  })
  it('renders users when fetching users succeeds', async () => {
    queryClient.setQueryData(['users'], mockUsers)
    renderWithQueryClient(<AccountAdmin />)
    const user1 = await screen.findByText('User One')
    expect(user1).toBeInTheDocument()
  })
  it('updates user status when clicking on the status button', async () => {
    queryClient.setQueryData(['users'], mockUsers)
    renderWithQueryClient(<AccountAdmin />)
    const user1 = await screen.findByText('User One')
    expect(user1).toBeInTheDocument()
    const statusButton = screen.getByTestId('status-desactivar')
    fireEvent.click(statusButton)
    await waitFor(() =>
      expect(screen.getByText('Desactivar')).toBeInTheDocument()
    )
  })
  it.skip('filters users by DNI', async () => {
    queryClient.setQueryData(['users'], mockUsers)
    renderWithQueryClient(<AccountAdmin />)
    const user1 = await screen.findByText('User One')
    expect(user1).toBeInTheDocument()
    const searchInput = screen.getByPlaceholderText('Escribe el DNI')
    fireEvent.change(searchInput, { target: { value: '12345678' } })
    await waitFor(() =>
      expect(screen.getByText('Test Name')).toBeInTheDocument()
    )
  })
})
