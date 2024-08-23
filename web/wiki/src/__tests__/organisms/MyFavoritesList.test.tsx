import { vi } from 'vitest'
import { useParams, Params } from 'react-router-dom'
import { TAuthContext, useAuth } from '../../context/AuthProvider'
import { render, screen, waitFor } from '../test-utils'
import { MyFavoritesList } from '../../components/organisms'
import { errorHandlers } from '../../__mocks__/handlers'
import { server } from '../../__mocks__/server'

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
      name: 'TestName',
    },
  } as TAuthContext)
  vi.mock('react-router-dom', async () => {
    const actual: Record<number, unknown> = await vi.importActual(
      'react-router-dom'
    )
    return {
      ...actual,
      useParams: vi.fn(),
    }
  })
})

afterEach(() => {
  server.resetHandlers()
  vi.resetAllMocks()
})

afterAll(() => server.close())

describe('MyFavoritesList', () => {
  it('renders correctly', async () => {
    vi.mocked(useParams).mockReturnValue({
      slug: 'react',
    } as Readonly<Params>)

    render(<MyFavoritesList />)

    const spinnerComponent = screen.getByRole('status') as HTMLDivElement

    expect(screen.getByTestId('title')).toBeInTheDocument()

    await waitFor(() => expect(spinnerComponent).toBeInTheDocument())
    await waitFor(() =>
      expect(screen.getByText('My favorite title')).toBeInTheDocument()
    )
  })

  it('shows message if user is not logged in', async () => {
    vi.mocked(useAuth).mockReturnValue({
      user: null,
    } as TAuthContext)
    vi.mocked(useParams).mockReturnValue({
      slug: 'react',
    } as Readonly<Params>)

    render(<MyFavoritesList />)

    expect(screen.getByTestId('no-user')).toBeInTheDocument()
  })

  it('shows no favorites message when the user has no favorite resources for a category', async () => {
    vi.mocked(useParams).mockReturnValue({
      slug: 'slugWithoutFavs',
    } as Readonly<Params>)

    render(<MyFavoritesList />)

    const spinnerComponent = screen.getByRole('status') as HTMLDivElement
    await waitFor(() => expect(spinnerComponent).toBeInTheDocument())

    await waitFor(() =>
      expect(
        screen.getByText('No hi ha recursos preferits')
      ).toBeInTheDocument()
    )
    expect(
      screen.queryByText('Alguna cosa ha anat malament...')
    ).not.toBeInTheDocument()
  })

  it('shows correct title when resize to mobile', async () => {
    global.innerWidth = 600
    vi.mocked(useParams).mockReturnValue({
      slug: 'react',
    } as Readonly<Params>)

    render(<MyFavoritesList />)

    const titleElement = screen.getByTestId('title')
    expect(titleElement).toHaveTextContent("Recursos que t'agraden")
  })

  it('shows correct title when resize to desktop', async () => {
    global.innerWidth = 1024
    vi.mocked(useParams).mockReturnValue({
      slug: 'react',
    } as Readonly<Params>)

    render(<MyFavoritesList />)

    const titleElement = screen.getByTestId('title')
    expect(titleElement).toHaveTextContent('Recursos preferits')
  })

  it('renders correctly on error', async () => {
    vi.mocked(useParams).mockReturnValue({
      slug: 'react',
    } as Readonly<Params>)
    server.use(...errorHandlers)

    render(<MyFavoritesList />)

    const spinnerComponent = screen.getByRole('status') as HTMLDivElement

    await waitFor(() => expect(spinnerComponent).toBeInTheDocument())

    await waitFor(() => {
      expect(
        screen.getByText('Alguna cosa ha anat malament...')
      ).toBeInTheDocument()
    })
  })
})
