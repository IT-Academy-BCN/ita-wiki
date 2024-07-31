import { vi } from 'vitest'
import { render, screen, waitFor } from '../test-utils'
import { UserProfile } from '../../pages'
import { TAuthContext, useAuth } from '../../context/AuthProvider'
import { errorHandlers, handlers } from '../../__mocks__/handlers'
import { server } from '../../__mocks__/server'

beforeEach(() => {
  server.use(...handlers)
  vi.mock('../../context/AuthProvider', async () => {
    const actual = await vi.importActual('../../context/AuthProvider')
    return {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ...actual,
      useAuth: vi.fn(),
    }
  })
  vi.mocked(useAuth).mockReturnValue({
    user: {
      name: 'User Test Name',
      email: 'mail@test.com',
    },
  } as TAuthContext)
})

afterEach(() => {
  vi.restoreAllMocks()
  server.resetHandlers()
})

describe('UserProfile', () => {
  it('renders correctly', async () => {
    render(<UserProfile />)

    const backButtonElement = screen.getByRole('button', {
      name: /arrow_back_ios torna/i,
    })
    expect(backButtonElement).toBeInTheDocument()

    expect(screen.getByTestId('card-profile')).toBeInTheDocument()

    expect(screen.getByText(/user test name/i)).toBeInTheDocument()
    expect(screen.getByText(/mail@test.com/i)).toBeInTheDocument()

    const spinnerComponent = screen.getAllByRole(
      'status'
    ) as unknown as HTMLDivElement

    await waitFor(() => expect(spinnerComponent).toHaveLength(6))

    await waitFor(() =>
      expect(screen.getByTestId(/aportacions/i)).toHaveTextContent('1')
    )

    await waitFor(() =>
      expect(screen.getByTestId(/recursos preferits/i)).toHaveTextContent('2')
    )

    await waitFor(() =>
      expect(screen.getByTestId(/vots rebuts/i)).toHaveTextContent('8')
    )

    expect(screen.getByText(/els teus recursos/i)).toBeInTheDocument()

    await waitFor(() =>
      expect(
        screen.getByText(/my resource title without slug/i)
      ).toBeInTheDocument()
    )

    expect(screen.getByText(/recursos que t'agraden/i)).toBeInTheDocument()

    await waitFor(() =>
      expect(screen.getByText(/my favorite title 2/i)).toBeInTheDocument()
    )

    expect(screen.getAllByText(/data/i)).toHaveLength(2)
  })

  it('renders correctly on server error', async () => {
    server.use(...errorHandlers)
    render(<UserProfile />)

    const spinnerComponent = screen.getAllByRole(
      'status'
    ) as unknown as HTMLDivElement

    await waitFor(() => expect(spinnerComponent).toHaveLength(6))

    const cardProfileElement = screen.getByTestId('card-profile')
    expect(cardProfileElement).toBeInTheDocument()

    expect(screen.getByText(/els teus recursos/i)).toBeInTheDocument()
    expect(screen.getByText(/recursos que t'agraden/i)).toBeInTheDocument()

    expect(screen.queryByText(/data/i)).not.toBeInTheDocument()

    await waitFor(() => expect(screen.getAllByText('n/d')).toHaveLength(3))

    const errorMessages = screen.getAllByText(
      /alguna cosa ha anat malament.../i
    )
    expect(errorMessages).toHaveLength(2)
  })
})
