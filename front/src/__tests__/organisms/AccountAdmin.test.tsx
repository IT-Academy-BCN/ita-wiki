import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen, fireEvent, waitFor } from '../test-utils'
import { AccountAdmin } from '../../components/organisms'
import { mswServer } from '../setup'
import { errorHandlers } from '../../__mocks__/handlers'

const queryClient = new QueryClient()

afterEach(() => {
  mswServer.resetHandlers()
})

afterAll(() => mswServer.close())

const renderWithQueryClient = (component: React.ReactNode) =>
  render(
    <QueryClientProvider client={queryClient}>{component}</QueryClientProvider>
  )

describe('AccountAdmin Component', () => {
  it('renders loading text while fetching users', async () => {
    render(<AccountAdmin />)
    const spinnerComponent = screen.getByRole('status') as HTMLDivElement
    expect(spinnerComponent).toBeInTheDocument()

    await waitFor(() => {
      const spinnerResolved = screen.queryByRole('status') as HTMLDivElement
      expect(spinnerResolved).toBeNull()
    })
  })

  it('renders users when fetching users succeeds', async () => {
    render(<AccountAdmin />)
    const user1 = await screen.findByText('Test Name')
    expect(user1).toBeInTheDocument()
    expect(screen.getByText('usertest@example.cat')).toBeInTheDocument()
    expect(screen.getByText('12345678L')).toBeInTheDocument()
  })

  it('filters users by DNI', async () => {
    render(<AccountAdmin />)
    const user1 = await screen.findByText('Test Name')
    expect(user1).toBeInTheDocument()
    const searchInput = screen.getByPlaceholderText('Introdueix el DNI')

    fireEvent.change(searchInput, { target: { value: '12345678L' } })
    await waitFor(() =>
      expect(screen.getByText('Test Name')).toBeInTheDocument()
    )

    fireEvent.change(searchInput, { target: { value: '90887788L' } })
    await waitFor(() =>
      expect(screen.queryByText('Test Name')).not.toBeInTheDocument()
    )
  })

  it('updates user status when clicking on the status button', async () => {
    render(<AccountAdmin />)

    const user1 = await screen.findByText('Test Name')
    expect(user1).toBeInTheDocument()
    expect(screen.getByText(/active/i)).toBeInTheDocument()
    const statusButton = screen.getByTestId('status-desactivar')
    expect(statusButton).toHaveTextContent(/desactivar/i)
    expect(screen.queryByText(/inactive/i)).not.toBeInTheDocument()

    fireEvent.click(statusButton)

    await waitFor(async () => {
      queryClient.getQueryData(['users'])
      renderWithQueryClient(<AccountAdmin />)
      expect(user1).toBeInTheDocument()
      expect(screen.getByText(/inactive/i)).toBeInTheDocument()
      expect(statusButton).toHaveTextContent(/activar/i)
    })
  })

  it('renders error text when fetching users fails', async () => {
    mswServer.use(...errorHandlers)
    render(<AccountAdmin />)
    const spinnerComponent = screen.getByRole('status') as HTMLDivElement
    expect(spinnerComponent).toBeInTheDocument()

    await waitFor(() => {
      const spinnerResolved = screen.queryByRole('status') as HTMLDivElement
      expect(spinnerResolved).not.toBeInTheDocument()
      expect(screen.getByText('Hi ha hagut un error...')).toBeInTheDocument()
    })
  })
})
