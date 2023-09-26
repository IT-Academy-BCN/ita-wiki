import { expect, vi } from 'vitest'
import { useParams, Params } from 'react-router-dom'
import { TAuthContext, useAuth } from '../../context/AuthProvider'
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '../test-utils'
import { MyFavoritesList } from '../../components/organisms'
import { mswServer } from '../setup'
import { errorHandlers } from '../../__mocks__/handlers'

beforeEach(() => {
  //https://vitest.dev/api/vi.html#vi-hoisted
  vi.mock('../../context/AuthProvider', async () => {
    const actual: Record<number, unknown> = await vi.importActual(
      '../../context/AuthProvider'
    )
    return {
      ...actual,
      useAuth: vi.fn(),
    }
  })
})

beforeEach(() => {
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
  mswServer.resetHandlers()
  vi.resetAllMocks()
})

afterAll(() => mswServer.close())

describe('MyFavoritesList', () => {
  it('renders correctly', async () => {
    vi.mocked(useAuth).mockReturnValue({
      user: {
        name: 'TestName',
        avatar: 'TestAvatar',
      },
    } as TAuthContext)
    vi.mocked(useParams).mockReturnValue({
      slug: 'react',
    } as Readonly<Params>)
    render(<MyFavoritesList />)

    const spinnerComponent = screen.getByRole('status') as HTMLDivElement

    expect(screen.getByTestId('title')).toBeInTheDocument()

    await waitFor(() => expect(spinnerComponent).toBeInTheDocument())
  })

  it('shows message if user is not logged', async () => {
    vi.mocked(useAuth).mockReturnValue({
      user: null,
    } as TAuthContext)
    vi.mocked(useParams).mockReturnValue({
      slug: 'react',
    } as Readonly<Params>)
    render(<MyFavoritesList />)
    expect(screen.getByTestId('no-user')).toBeInTheDocument()
  })

  it.only('receives data when API call returns 200 and the user has no favorite resources', async () => {
    //Aquest no va pq no aconsegueixo que entri al slug, no el reconeix i no pinta els console logs prepaarts per detectar . Aeshores o els rteci ni modo o integro els dos mocks, el problema port ser precisamente que nsi fas dos mocks no els pots fer u nn rere l'altre
    vi.mocked(useAuth).mockReturnValue({
      user: {
        name: 'TestName',
        avatar: 'TestAvatar',
      },
    } as TAuthContext)
    vi.mocked(useParams).mockReturnValue({
      slug: 'slugWithoutFavs',
    } as Readonly<Params>)
    render(<MyFavoritesList />)
    const spinnerComponent = screen.getByRole('status') as HTMLDivElement
    // await waitFor(() => expect(spinnerComponent).toBeInTheDocument())
    // await waitForElementToBeRemoved(() => spinnerComponent)
    await waitFor(() =>
      expect(screen.getByTestId('no-favs')).toBeInTheDocument()
    )

    // expect(screen.getByText('No tienes recursos favoritos')).toBeInTheDocument()

    //AIxÒ NO FUNCIONA
    expect(screen.queryByText('Algo ha ido mal...')).not.toBeInTheDocument()
    screen.debug()
  })

  it('shows correct title when resize to mobile', async () => {
    global.innerWidth = 600
    vi.mocked(useAuth).mockReturnValue({
      user: {
        name: 'TestName',
        avatar: 'TestAvatar',
      },
    } as TAuthContext)
    vi.mocked(useParams).mockReturnValue({
      slug: 'react',
    } as Readonly<Params>)
    render(<MyFavoritesList />)
    const titleElement = screen.getByTestId('title')
    expect(titleElement).toHaveTextContent('Recursos que te gustan')
  })

  it('shows correct title when resize to desktop', async () => {
    global.innerWidth = 1024
    vi.mocked(useAuth).mockReturnValue({
      user: {
        name: 'TestName',
        avatar: 'TestAvatar',
      },
    } as TAuthContext)
    vi.mocked(useParams).mockReturnValue({
      slug: 'react',
    } as Readonly<Params>)
    render(<MyFavoritesList />)
    const titleElement = screen.getByTestId('title')
    expect(titleElement).toHaveTextContent('Recursos favoritos')
  })

  it('renders correctly on error', async () => {
    vi.mocked(useAuth).mockReturnValue({
      user: {
        name: 'TestName',
        avatar: 'TestAvatar',
      },
    } as TAuthContext)
    vi.mocked(useParams).mockReturnValue({
      slug: 'react',
    } as Readonly<Params>)
    mswServer.use(...errorHandlers)
    render(<MyFavoritesList />)
    const spinnerComponent = screen.getByRole('status') as HTMLDivElement

    await waitFor(() => expect(spinnerComponent).toBeInTheDocument())

    await waitFor(() => {
      expect(screen.getByText('Algo ha ido mal...')).toBeInTheDocument()
    })
  })
})
