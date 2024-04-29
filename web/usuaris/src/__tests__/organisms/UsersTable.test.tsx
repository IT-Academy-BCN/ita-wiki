import { fireEvent, render, screen, waitFor } from '../test-utils'
import { UsersTable } from '../../components/organisms'
import { errorHandlers } from '../../__mocks__/handlers'
import { server } from '../../__mocks__/server'

afterEach(() => {
  server.resetHandlers()
})

afterAll(() => server.close())

describe('UsersTable', () => {
  it('renders loading spinner while fetching users', async () => {
    render(<UsersTable filtersSelected={{}} />)

    const spinner = screen.getByRole('status') as HTMLDivElement
    expect(spinner).toBeInTheDocument()

    await waitFor(() => {
      const spinnerResolved = screen.queryByRole('status') as HTMLDivElement
      expect(spinnerResolved).toBeNull()
    })
  })

  it('renders users correctly after fetching users succeeds', async () => {
    render(<UsersTable filtersSelected={{}} />)

    await waitFor(() => {
      expect(screen.getByLabelText(/Ona Sitgar/i)).toBeInTheDocument()
      expect(screen.getByText('12345678A')).toBeInTheDocument()
      expect(screen.getByLabelText(/Marc Bofill/i)).toBeInTheDocument()
      expect(screen.getByText('87654321B')).toBeInTheDocument()
      expect(screen.getByLabelText(/Montserrat Capdevila/i)).toBeInTheDocument()
      expect(screen.getByText('45678912C')).toBeInTheDocument()

      expect(screen.getByText(/Pendent/i)).toBeInTheDocument()
      expect(screen.getByText(/Backend Node/i)).toBeInTheDocument()
      expect(screen.getByText('ADMIN')).toBeInTheDocument()
      expect(screen.getByText(/Acceptar/i)).toBeInTheDocument()
      expect(screen.getByText(/Actiu/i)).toBeInTheDocument()

      expect(screen.getByText(/Frontend React/i)).toBeInTheDocument()
      expect(screen.getByText('REGISTERED')).toBeInTheDocument()

      expect(screen.getByText('Bloquejar')).toBeInTheDocument()
      expect(screen.getByText(/Fullstack Php/i)).toBeInTheDocument()

      expect(screen.getByText('MENTOR')).toBeInTheDocument()
      expect(screen.getByText('Desbloquejar')).toBeInTheDocument()

      const frontReact = screen.getAllByText(/Frontend React/i)
      frontReact.forEach((item) => expect(item).toBeInTheDocument())

      const blockedStatus = screen.getAllByText('Bloquejat')
      blockedStatus.forEach((status) => expect(status).toBeInTheDocument())

      const unblockButton = screen.getAllByText('Desbloquejar')
      unblockButton.forEach((button) => expect(button).toBeInTheDocument())

      const deleteIcons = screen.getAllByAltText(/delete-icon/i)
      deleteIcons.forEach((icon) => expect(icon).toBeInTheDocument())
    })
  })

  it('renders filtered users correctly when filters applied', async () => {
    render(
      <UsersTable
        filtersSelected={{
          itinerarySlug: 'frontend-react',
          name: 'marc',
          dni: 'marc',
        }}
      />
    )

    await waitFor(() => {
      expect(screen.getByLabelText(/Marc Bofill/i)).toBeInTheDocument()
      expect(screen.getByText('87654321B')).toBeInTheDocument()
      expect(screen.getByText(/Actiu/i)).toBeInTheDocument()
      expect(screen.getByText(/Frontend React/i)).toBeInTheDocument()
      expect(screen.getByText('Bloquejar')).toBeInTheDocument()

      expect(screen.queryByText(/Fullstack Php/i)).not.toBeInTheDocument()
      expect(screen.queryByText(/Backend Node/i)).not.toBeInTheDocument()
      expect(screen.queryByText(/Marc Serra/i)).not.toBeInTheDocument()
    })
  })

  it('renders error message when fetching users has error', async () => {
    server.use(...errorHandlers)

    render(<UsersTable filtersSelected={{}} />)

    const spinner = screen.getByRole('status') as HTMLDivElement
    expect(spinner).toBeInTheDocument()

    await waitFor(() => {
      const spinnerResolved = screen.queryByRole('status') as HTMLDivElement
      expect(spinnerResolved).toBeNull()
      expect(screen.getByText('Hi ha hagut un error...')).toBeInTheDocument()
    })
  })

  it('disables/enables users with different status when checkboxes are checked/unchecked', async () => {
    render(<UsersTable filtersSelected={{}} />)

    await waitFor(() => {
      const checkboxPending = screen.getByLabelText(/Ona Sitgar/i)
      const checkboxActive = screen.getByLabelText(/Marc Bofill/i)
      const checkboxBlocked = screen.getByLabelText(/Montserrat Capdevila/i)

      const acceptButton = screen.getByText('Acceptar')
      const blockButton = screen.getByText('Bloquejar')
      const unblockButton = screen.getAllByText('Desbloquejar')

      const backend = screen.getByText(/Backend Node/i)
      const frontReact = screen.getAllByText(/Frontend React/i)
      const fullstack = screen.getByText(/Fullstack Php/i)

      fireEvent.click(checkboxPending)

      waitFor(() => {
        expect(checkboxPending).toBeChecked()
        expect(checkboxActive).toBeDisabled()
        expect(checkboxBlocked).toBeDisabled()

        expect(acceptButton).not.toBeDisabled()
        expect(blockButton).toBeDisabled()
        unblockButton.forEach((button) => expect(button).toBeDisabled())

        expect(backend).toHaveStyle('opacity: 1')
        frontReact.forEach((item) => expect(item).toHaveStyle('opacity: 0.6'))
        expect(fullstack).toHaveStyle('opacity: 0.6')
      })

      fireEvent.click(checkboxPending)

      waitFor(() => {
        expect(checkboxPending).not.toBeChecked()
        expect(checkboxActive).not.toBeDisabled()
        expect(checkboxBlocked).not.toBeDisabled()

        expect(acceptButton).not.toBeDisabled()
        expect(blockButton).not.toBeDisabled()
        unblockButton.forEach((button) => expect(button).not.toBeDisabled())

        expect(backend).toHaveStyle('opacity: 1')
        frontReact.forEach((item) => expect(item).toHaveStyle('opacity: 1'))
        expect(fullstack).toHaveStyle('opacity: 1')
      })
    })
  })

  it('updates status and action button when user status changes', async () => {
    render(<UsersTable filtersSelected={{}} />)

    await waitFor(() => {
      const acceptButton = screen.getByText('Acceptar')
      const pendingStatus = screen.getByText(/Pendent/i)

      expect(pendingStatus).toHaveTextContent(/Pendent/i)

      fireEvent.click(acceptButton)

      waitFor(() => {
        expect(acceptButton).toHaveTextContent('Bloquejar')
        expect(pendingStatus).toHaveTextContent(/Actiu/i)
      })
    })
  })
})
