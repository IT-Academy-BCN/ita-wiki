import { vi } from 'vitest'
import { HttpResponse, http } from 'msw'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useParams, Params, useLocation } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import { render, screen, waitFor, fireEvent } from '../test-utils'
import { TAuthContext, useAuth } from '../../context/AuthProvider'
import { TopicsManagerBoard } from '../../components/organisms'
import { errorHandlers } from '../../__mocks__/handlers'
import { urls } from '../../constants'
import { server } from '../../__mocks__/server'

beforeEach(() => {
  vi.mock('../../context/AuthProvider', async () => {
    const actual = await vi.importActual('../../context/AuthProvider')
    return {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ...actual,
      useAuth: vi.fn(),
    }
  })
  vi.mock('react-router-dom', async () => {
    const actual: Record<number, unknown> = await vi.importActual(
      'react-router-dom'
    )
    return {
      ...actual,
      useParams: vi.fn(),
      useLocation: vi.fn(),
    }
  })
})

afterEach(() => {
  vi.restoreAllMocks()
  server.resetHandlers()
})

afterAll(() => server.close())

const queryClient = new QueryClient()

const renderWithQueryClient = (component: React.ReactNode) =>
  render(
    <QueryClientProvider client={queryClient}>{component}</QueryClientProvider>
  )

describe('TopicsManagerBoard component', () => {
  it('renders correctly without user', async () => {
    vi.mocked(useParams).mockReturnValue({
      slug: 'react',
    } as Readonly<Params>)
    vi.mocked(useLocation).mockReturnValue({
      pathname: '',
      search: '',
      hash: '',
      key: '',
      state: { name: 'React', id: 'cln1er1vn000008mk79bs02c5' },
    }) as unknown as Location
    vi.mocked(useAuth).mockReturnValue({
      user: null,
    } as TAuthContext)
    render(<TopicsManagerBoard />)

    await waitFor(() =>
      expect(
        screen.getByText(
          'No tens els permisos necessaris per accedir a aquest contingut.'
        )
      ).toBeInTheDocument()
    )
  })

  it('renders correctly without category slug', () => {
    vi.mocked(useParams).mockReturnValue({
      slug: undefined,
    } as Readonly<Params>)
    vi.mocked(useAuth).mockReturnValue({
      user: {
        name: 'Name',
        avatarId: 'Avatar',
        role: 'MENTOR',
      },
    } as TAuthContext)
    vi.mocked(useLocation).mockReturnValue({
      pathname: '',
      search: '',
      hash: '',
      key: '',
      state: { name: undefined, id: undefined },
    }) as unknown as Location
    render(<TopicsManagerBoard />)

    expect(
      screen.getByText(
        /No hi ha temes disponibles. *Accedeix des d'una categoria per veure o gestionar els temes./
      )
    ).toBeInTheDocument()
  })

  it('renders correctly with category slug', async () => {
    vi.mocked(useParams).mockReturnValue({
      slug: 'react',
    } as Readonly<Params>)
    vi.mocked(useLocation).mockReturnValue({
      pathname: '',
      search: '',
      hash: '',
      key: '',
      state: { name: 'React', id: 'cln1er1vn000008mk79bs02c5' },
    }) as unknown as Location
    vi.mocked(useAuth).mockReturnValue({
      user: {
        name: 'Name',
        avatarId: 'Avatar',
        role: 'MENTOR',
      },
    } as TAuthContext)
    render(<TopicsManagerBoard />)

    const spinnerComponent = screen.getByRole('status') as HTMLDivElement

    await waitFor(() => expect(spinnerComponent).toBeInTheDocument())

    await waitFor(() => {
      expect(screen.getByText('Temes de React')).toBeInTheDocument()
      expect(screen.getByText('+ Crea un nou tema')).toBeInTheDocument()
      expect(screen.getByText('Listas')).toBeInTheDocument()
      expect(screen.getByText('Renderizado condicional')).toBeInTheDocument()
    })
  })

  it('renders correctly with category slug without topics yet', async () => {
    vi.mocked(useParams).mockReturnValue({
      slug: 'empty-topics',
    } as Readonly<Params>)
    vi.mocked(useLocation).mockReturnValue({
      pathname: '',
      search: '',
      hash: '',
      key: '',
      state: { name: 'React', id: 'cln1er1vn000008mk79bs02c5' },
    }) as unknown as Location
    vi.mocked(useAuth).mockReturnValue({
      user: {
        name: 'Name',
        avatarId: 'Avatar',
        role: 'MENTOR',
      },
    } as TAuthContext)
    render(<TopicsManagerBoard />)

    const spinnerComponent = screen.getByRole('status') as HTMLDivElement

    await waitFor(() => expect(spinnerComponent).toBeInTheDocument())

    await waitFor(() => {
      expect(screen.getByText('+ Crea un nou tema')).toBeInTheDocument()
      expect(screen.queryByText('Listas')).not.toBeInTheDocument()
      expect(
        screen.queryByText('Renderizado condicional')
      ).not.toBeInTheDocument()
      expect(
        screen.queryByRole('button', { name: 'Edita' })
      ).not.toBeInTheDocument()
      expect(
        screen.queryByRole('button', { name: 'Esborra el tema' })
      ).not.toBeInTheDocument()
    })
  })

  it('renders an error with an invalid slug', async () => {
    vi.mocked(useParams).mockReturnValue({
      slug: 'invalid-slug',
    } as Readonly<Params>)
    vi.mocked(useLocation).mockReturnValue({
      pathname: '',
      search: '',
      hash: '',
      key: '',
      state: { name: 'React', id: 'cln1er1vn000008mk79bs02c5' },
    }) as unknown as Location
    vi.mocked(useAuth).mockReturnValue({
      user: {
        name: 'Name',
        avatarId: 'Avatar',
        role: 'MENTOR',
      },
    } as TAuthContext)
    render(<TopicsManagerBoard />)

    const spinnerComponent = screen.getByRole('status') as HTMLDivElement

    await waitFor(() => expect(spinnerComponent).toBeInTheDocument())

    await waitFor(() => {
      expect(screen.getByText('Hi ha hagut un error...')).toBeInTheDocument()
    })
  })

  it('shows error message on create error', async () => {
    vi.mocked(useParams).mockReturnValue({
      slug: 'react',
    } as Readonly<Params>)
    vi.mocked(useLocation).mockReturnValue({
      pathname: '',
      search: '',
      hash: '',
      key: '',
      state: { name: 'React', id: 'cln1er1vn000008mk79bs02c5' },
    }) as unknown as Location
    vi.mocked(useAuth).mockReturnValue({
      user: null,
    } as TAuthContext)
    server.use(...errorHandlers)

    render(<TopicsManagerBoard />)

    const spinnerComponent = screen.getByRole('status') as HTMLDivElement

    await waitFor(() => expect(spinnerComponent).toBeInTheDocument())

    await waitFor(() => {
      expect(screen.getByText('Hi ha hagut un error...')).toBeInTheDocument()
    })
  })

  it('shows error message on update topic if user is not a mentor/admin (error 403)', async () => {
    vi.mocked(useParams).mockReturnValue({
      slug: 'react',
    } as Readonly<Params>)
    vi.mocked(useLocation).mockReturnValue({
      pathname: '',
      search: '',
      hash: '',
      key: '',
      state: { name: 'React', id: 'cln1er1vn000008mk79bs02c5' },
    }) as unknown as Location
    vi.mocked(useAuth).mockReturnValue({
      user: { name: 'Name', avatarId: 'Avatar', role: 'REGISTERED' },
    } as TAuthContext)
    server.use(
      http.patch(urls.patchTopics, () =>
        HttpResponse.json(null, { status: 403 })
      )
    )
    render(<TopicsManagerBoard />)

    await waitFor(() => {
      const editButton = screen.getByTestId('editcli04v2l0000008mq5pwx7w5j')
      expect(screen.getByText('Listas')).toBeInTheDocument()
      expect(editButton).toBeInTheDocument()
      fireEvent.click(editButton)
    })

    await userEvent.type(screen.getByDisplayValue('Listas'), 'Listas edited')

    fireEvent.click(
      screen.getByRole('button', {
        name: "Confirma l'edició",
      })
    )

    await waitFor(() =>
      expect(
        screen.getByText(
          "Accés denegat. No tens els permisos necessaris per realitzar l'operació."
        )
      ).toBeInTheDocument()
    )
  })

  it('updates topics list on update topic', async () => {
    vi.mocked(useParams).mockReturnValue({
      slug: 'react',
    } as Readonly<Params>)
    vi.mocked(useLocation).mockReturnValue({
      pathname: '',
      search: '',
      hash: '',
      key: '',
      state: { name: 'React', id: 'cln1er1vn000008mk79bs02c5' },
    }) as unknown as Location
    vi.mocked(useAuth).mockReturnValue({
      user: { name: 'Name', avatarId: 'Avatar', role: 'MENTOR' },
    } as TAuthContext)

    render(<TopicsManagerBoard />)

    await waitFor(() => {
      const editButton = screen.getByTestId('editcli04v2l0000008mq5pwx7w5j')
      expect(screen.getByText('Listas')).toBeInTheDocument()
      expect(editButton).toBeInTheDocument()
      fireEvent.click(editButton)
    })

    await userEvent.type(screen.getByDisplayValue('Listas'), 'Listas edited')

    fireEvent.click(
      screen.getByRole('button', {
        name: "Confirma l'edició",
      })
    )
    await waitFor(async () => {
      queryClient.getQueryData(['getTopics'])
      renderWithQueryClient(<TopicsManagerBoard />)
      expect(screen.getByText(/listas edited/i)).toBeInTheDocument()
    })
  })

  it('shows error message on update topic in case of server error (error 500)', async () => {
    vi.mocked(useParams).mockReturnValue({
      slug: 'react',
    } as Readonly<Params>)
    vi.mocked(useLocation).mockReturnValue({
      pathname: '',
      search: '',
      hash: '',
      key: '',
      state: { name: 'React', id: 'cln1er1vn000008mk79bs02c5' },
    }) as unknown as Location
    vi.mocked(useAuth).mockReturnValue({
      user: { name: 'Name', avatarId: 'Avatar', role: 'MENTOR' },
    } as TAuthContext)
    server.use(
      http.patch(urls.patchTopics, () =>
        HttpResponse.json(null, { status: 500 })
      )
    )
    render(<TopicsManagerBoard />)

    await waitFor(() => {
      const editButton = screen.getByTestId('editcli04v2l0000008mq5pwx7w5j')
      expect(screen.getByText('Listas')).toBeInTheDocument()
      expect(editButton).toBeInTheDocument()
      fireEvent.click(editButton)
    })

    await userEvent.type(screen.getByDisplayValue('Listas'), 'Listas edited')

    fireEvent.click(
      screen.getByRole('button', {
        name: "Confirma l'edició",
      })
    )

    await waitFor(() =>
      expect(
        screen.getByText(
          'Error en la base de dades. Per favor, intenta-ho més tard.'
        )
      ).toBeInTheDocument()
    )
  })

  it('shows message when trying to save empty topic', async () => {
    vi.mocked(useParams).mockReturnValue({
      slug: 'react',
    } as Readonly<Params>)
    vi.mocked(useLocation).mockReturnValue({
      pathname: '',
      search: '',
      hash: '',
      key: '',
      state: { name: 'React', id: 'cln1er1vn000008mk79bs02c5' },
    }) as unknown as Location
    vi.mocked(useAuth).mockReturnValue({
      user: { name: 'Name', avatarId: 'Avatar', role: 'MENTOR' },
    } as TAuthContext)

    render(<TopicsManagerBoard />)

    await waitFor(() => {
      const editButton = screen.getByTestId('editcli04v2l0000008mq5pwx7w5j')
      expect(screen.getByText('Listas')).toBeInTheDocument()
      expect(editButton).toBeInTheDocument()
      fireEvent.click(editButton)
    })

    const itemInput = screen.getByDisplayValue('Listas') as HTMLInputElement
    await userEvent.clear(itemInput)

    expect(itemInput.placeholder).toBe('Nom del tema')

    fireEvent.click(
      screen.getByRole('button', {
        name: "Confirma l'edició",
      })
    )

    await waitFor(() =>
      expect(
        screen.getByText('Per favor, no deixis buit el nom del tema.')
      ).toBeInTheDocument()
    )
  })

  // TODO: Update this test when delete topic is available
  it('shows message when trying to delete', async () => {
    vi.mocked(useParams).mockReturnValue({
      slug: 'react',
    } as Readonly<Params>)
    vi.mocked(useLocation).mockReturnValue({
      pathname: '',
      search: '',
      hash: '',
      key: '',
      state: { name: 'React', id: 'cln1er1vn000008mk79bs02c5' },
    }) as unknown as Location
    vi.mocked(useAuth).mockReturnValue({
      user: { name: 'Name', avatarId: 'Avatar', role: 'MENTOR' },
    } as TAuthContext)

    render(<TopicsManagerBoard />)

    await waitFor(() => {
      const deleteButtons = screen.getAllByTitle('Esborra el tema')
      expect(deleteButtons).toHaveLength(2)
      const deleteListasBtn = deleteButtons[0]
      expect(deleteListasBtn).toBeInTheDocument()
      fireEvent.click(deleteListasBtn)
    })

    const deleteAndConfirmButtons = screen.getAllByTitle('Esborra el tema')
    expect(deleteAndConfirmButtons).toHaveLength(2)
    const deleteListasConfirm = deleteAndConfirmButtons[0]
    expect(deleteListasConfirm).toBeInTheDocument()
    fireEvent.click(deleteListasConfirm)
    await waitFor(() =>
      expect(
        screen.getByText('No és possible esborrar el tema.')
      ).toBeInTheDocument()
    )
  })

  it('renders correctly on error', async () => {
    vi.mocked(useParams).mockReturnValue({
      slug: 'react',
    } as Readonly<Params>)
    vi.mocked(useLocation).mockReturnValue({
      pathname: '',
      search: '',
      hash: '',
      key: '',
      state: { name: 'React', id: 'cln1er1vn000008mk79bs02c5' },
    }) as unknown as Location
    vi.mocked(useAuth).mockReturnValue({
      user: {
        name: 'Name',
        avatarId: 'Avatar',
        role: 'MENTOR',
      },
    } as TAuthContext)
    server.use(...errorHandlers)

    render(<TopicsManagerBoard />)

    const spinnerComponent = screen.getByRole('status') as HTMLDivElement

    await waitFor(() => expect(spinnerComponent).toBeInTheDocument())

    await waitFor(() => {
      expect(screen.getByText('Hi ha hagut un error...')).toBeInTheDocument()
    })
  })
})
