import { render, screen, waitFor } from '../test-utils'
import { UsersTable } from '../../components/organisms'
import { errorHandlers } from '../../__mocks__/handlers'
import { server } from '../../__mocks__/server'

afterEach(() => {
  server.resetHandlers()
})

afterAll(() => server.close())

describe('UsersTable', () => {
  it('renders loading spinner while fetching users', async () => {
    render(<UsersTable />)

    const spinner = screen.getByRole('status') as HTMLDivElement
    expect(spinner).toBeInTheDocument()

    await waitFor(() => {
      const spinnerResolved = screen.queryByRole('status') as HTMLDivElement
      expect(spinnerResolved).toBeNull()
    })
  })

  it('renders users correctly after fetching users succeeds', async () => {
    render(<UsersTable />)

    const testUser = await screen.findByText('Test Name')

    expect(testUser).toBeInTheDocument()
    expect(screen.getByText('Pendent')).toBeInTheDocument()
    expect(screen.getByText('backend-node')).toBeInTheDocument()
  })

  it('renders error message when fetching users has error', async () => {
    server.use(...errorHandlers)

    render(<UsersTable />)

    const spinner = screen.getByRole('status') as HTMLDivElement
    expect(spinner).toBeInTheDocument()

    await waitFor(() => {
      const spinnerResolved = screen.queryByRole('status') as HTMLDivElement
      expect(spinnerResolved).toBeNull()
      expect(screen.getByText('Hi ha hagut un error...')).toBeInTheDocument()
    })
  })
})
