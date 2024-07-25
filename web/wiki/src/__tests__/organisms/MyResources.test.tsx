import { vi } from 'vitest'
import { useParams, Params } from 'react-router-dom'
import { TAuthContext, useAuth } from '../../context/AuthProvider'
import { render, screen, waitFor } from '../test-utils'
import { MyResources } from '../../components/organisms'
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
      name: 'Hola',
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
  vi.mocked(useParams).mockReturnValue({
    slug: 'react',
  } as Readonly<Params>)
})

afterEach(() => {
  server.resetHandlers()
  vi.resetAllMocks()
})

afterAll(() => server.close())

describe('MyResources component', () => {
  it('renders correctly', async () => {
    render(<MyResources />)

    const spinnerComponent = screen.getByRole('status') as HTMLDivElement

    expect(screen.getByTestId('title')).toBeInTheDocument()

    await waitFor(() => expect(spinnerComponent).toBeInTheDocument())
    await waitFor(() =>
      expect(screen.getByText('My React resource title')).toBeInTheDocument()
    )
    expect(screen.getByAltText('Edita el recurs')).toBeInTheDocument()
  })

  it('shows message if user is not logged', async () => {
    vi.mocked(useAuth).mockReturnValue({
      user: null,
    } as TAuthContext)

    render(<MyResources />)
    expect(screen.getByTestId('no-user')).toBeInTheDocument()
  })

  it('shows no resources message when the user has no resources for a category', async () => {
    vi.mocked(useParams).mockReturnValue({
      slug: 'emptySlug',
    } as Readonly<Params>)
    render(<MyResources />)

    const spinnerComponent = screen.getByRole('status') as HTMLDivElement
    await waitFor(() => expect(spinnerComponent).toBeInTheDocument())

    await waitFor(() =>
      expect(screen.getByText('No has publicat cap recurs')).toBeInTheDocument()
    )
    expect(
      screen.queryByText('Alguna cosa ha anat malament...')
    ).not.toBeInTheDocument()
  })

  it('shows correct title when resizes to laptop', async () => {
    global.innerWidth = 1024
    render(<MyResources />)

    const title = screen.getByTestId('main-title')
    expect(title).toHaveTextContent('Els meus recursos')
  })

  it('shows ResourceTitleLink when resizes to laptop', async () => {
    vi.mocked(useAuth).mockReturnValue({
      user: {
        name: 'Hola',
      },
    } as TAuthContext)

    global.innerWidth = 1024
    render(<MyResources />)

    await waitFor(() => {
      expect(screen.queryByTestId('resource-title')).toBeInTheDocument()
    })
  })

  it('renders correctly on error', async () => {
    server.use(...errorHandlers)

    render(<MyResources />)
    const spinnerComponent = screen.getByRole('status') as HTMLDivElement

    await waitFor(() => expect(spinnerComponent).toBeInTheDocument())

    await waitFor(() => {
      expect(
        screen.getByText('Alguna cosa ha anat malament...')
      ).toBeInTheDocument()
    })
  })
})
