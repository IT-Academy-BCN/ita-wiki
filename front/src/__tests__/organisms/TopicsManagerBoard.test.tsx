import { vi } from 'vitest'
import { useParams, Params } from 'react-router-dom'
import { render, screen, waitFor } from '../test-utils'
import { TopicsManagerBoard } from '../../components/organisms'
import { mswServer } from '../setup'
import { errorHandlers } from '../../__mocks__/handlers'

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
  vi.restoreAllMocks()
})

describe('TopicsManagerBoard component', () => {
  it('renders correctly without category slug', () => {
    vi.mocked(useParams).mockReturnValue({
      slug: undefined,
    } as Readonly<Params>)

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

    render(<TopicsManagerBoard />)

    const spinnerComponent = screen.getByRole('status') as HTMLDivElement

    await waitFor(() => expect(spinnerComponent).toBeInTheDocument())

    await waitFor(() => {
      expect(screen.getByText('+ Crear nuevo tema')).toBeInTheDocument()
      expect(screen.getByText('Listas')).toBeInTheDocument()
      expect(screen.getByText('Renderizado condicional')).toBeInTheDocument()
    })
  })

  it('renders correctly with category slug without topics yet', async () => {
    vi.mocked(useParams).mockReturnValue({
      slug: 'empty-topics',
    } as Readonly<Params>)

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
  })

  it('renders an error with an invalid slug', async () => {
    vi.mocked(useParams).mockReturnValue({
      slug: 'invalid-slug',
    } as Readonly<Params>)

    render(<TopicsManagerBoard />)

    const spinnerComponent = screen.getByRole('status') as HTMLDivElement

    await waitFor(() => expect(spinnerComponent).toBeInTheDocument())

    await waitFor(() => {
      expect(screen.getByText('Ha habido un error...')).toBeInTheDocument()
    })
  })

  it('renders correctly on error', async () => {
    vi.mocked(useParams).mockReturnValue({
      slug: 'react',
    } as Readonly<Params>)

    mswServer.use(...errorHandlers)

    render(<TopicsManagerBoard />)

    const spinnerComponent = screen.getByRole('status') as HTMLDivElement

    await waitFor(() => expect(spinnerComponent).toBeInTheDocument())

    await waitFor(() => {
      expect(screen.getByText('Ha habido un error...')).toBeInTheDocument()
    })
  })
})
