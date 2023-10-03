import { vi } from 'vitest'
import { rest } from 'msw'
import { useParams, Params, useLocation } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import { render, screen, waitFor, fireEvent } from '../test-utils'
import { TAuthContext, useAuth } from '../../context/AuthProvider'
import { TopicsManagerBoard } from '../../components/organisms'
import { mswServer } from '../setup'
import { errorHandlers } from '../../__mocks__/handlers'
import { urls } from '../../constants'

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
      // useLocation: vi.fn().mockImplementation(() => ({
      //   pathname: '',
      //   search: '',
      //   hash: '',
      //   key: '',
      //   state: { name: 'React', id: 'cln1er1vn000008mk79bs02c5' },
      // })),
    }
  })
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('TopicsManagerBoard component', () => {
  it('renders correctly without category slug', () => {
    vi.mocked(useParams).mockReturnValue({
      slug: undefined,
    } as Readonly<Params>)
    vi.mocked(useAuth).mockReturnValue({
      user: {
        name: 'Name',
        avatar: 'Avatar',
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
        'No hay temas disponibles. Accede desde una categoría para ver o gestionar sus temas.'
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
        avatar: 'Avatar',
        role: 'MENTOR',
      },
    } as TAuthContext)
    render(<TopicsManagerBoard />)

    const spinnerComponent = screen.getByRole('status') as HTMLDivElement

    await waitFor(() => expect(spinnerComponent).toBeInTheDocument())

    await waitFor(() => {
      expect(screen.getByText('Temas de React')).toBeInTheDocument()
      expect(screen.getByText('+ Crear nuevo tema')).toBeInTheDocument()
      expect(screen.getByText('Listas')).toBeInTheDocument()
      expect(screen.getByText('Renderizado condicional')).toBeInTheDocument()
    })

    screen.debug()
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
        avatar: 'Avatar',
        role: 'MENTOR',
      },
    } as TAuthContext)
    render(<TopicsManagerBoard />)

    const spinnerComponent = screen.getByRole('status') as HTMLDivElement

    await waitFor(() => expect(spinnerComponent).toBeInTheDocument())

    await waitFor(() => {
      expect(screen.getByText('+ Crear nuevo tema')).toBeInTheDocument()
      expect(screen.queryByText('Listas')).not.toBeInTheDocument()
      expect(
        screen.queryByText('Renderizado condicional')
      ).not.toBeInTheDocument()
      expect(
        screen.queryByRole('button', { name: 'Editar' })
      ).not.toBeInTheDocument()
      expect(
        screen.queryByRole('button', { name: 'Borrar tema' })
      ).not.toBeInTheDocument()
    })
    screen.debug()
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
        avatar: 'Avatar',
        role: 'MENTOR',
      },
    } as TAuthContext)
    render(<TopicsManagerBoard />)

    const spinnerComponent = screen.getByRole('status') as HTMLDivElement

    await waitFor(() => expect(spinnerComponent).toBeInTheDocument())

    await waitFor(() => {
      expect(screen.getByText('Ha habido un error...')).toBeInTheDocument()
    })
  })

  it('shows error message on create error (401)', async () => {
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
    mswServer.use(...errorHandlers)
    //NOSÉ SI EL PUC FER!!
    render(<TopicsManagerBoard />)

    const spinnerComponent = screen.getByRole('status') as HTMLDivElement

    await waitFor(() => expect(spinnerComponent).toBeInTheDocument())

    await waitFor(() => {
      expect(screen.getByText('Ha habido un error...')).toBeInTheDocument()
    })
  })

  //FUNCIONA SI !== MENTOR
  it('shows error message on update topic if user is not a mentor (error 403)', async () => {
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
      user: { name: 'Name', avatar: 'Avatar', role: 'REGISTERED' },
    } as TAuthContext)
    mswServer.use(
      rest.patch(urls.patchTopics, (req, res, ctx) => res(ctx.status(403)))
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
        name: 'Confirmar edición',
      })
    )

    await waitFor(() =>
      expect(
        screen.getByText(
          'Acceso denegado. No tienes los permisos necesarios para realizar la operación.'
        )
      ).toBeInTheDocument()
    )
  })

  //FUNCIONA SI === MENTOR
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
      user: { name: 'Name', avatar: 'Avatar', role: 'MENTOR' },
    } as TAuthContext)
    mswServer.use(
      rest.patch(urls.patchTopics, (req, res, ctx) => res(ctx.status(500)))
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
        name: 'Confirmar edición',
      })
    )

    await waitFor(() =>
      expect(
        screen.getByText(
          'Error en la base de datos. Por favor, inténtalo más tarde.'
        )
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
        avatar: 'Avatar',
        role: 'MENTOR',
      },
    } as TAuthContext)
    mswServer.use(...errorHandlers)

    render(<TopicsManagerBoard />)

    const spinnerComponent = screen.getByRole('status') as HTMLDivElement

    await waitFor(() => expect(spinnerComponent).toBeInTheDocument())

    await waitFor(() => {
      expect(screen.getByText('Ha habido un error...')).toBeInTheDocument()
    })
  })
})
