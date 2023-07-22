import { setupServer } from 'msw/node'
import { fireEvent } from '@testing-library/react'
import { expect, vi } from 'vitest'
import { render, screen } from '../test-utils'
import { Category } from '../../pages'
import { handlers } from '../../__mocks__/handlers'
import { TAuthContext, useAuth } from '../../context/AuthProvider'

vi.mock('react-router-dom', async () => {
  const actual: Record<number, unknown> = await vi.importActual(
    'react-router-dom'
  )
  return {
    ...actual,
    useParams: () => ({ categoryId: 1 }),
  }
})

const server = setupServer(...handlers)

beforeEach(() => {
  vi.mocked(useAuth).mockReturnValue({
    user: {
      name: 'Name',
      avatar: 'Avatar',
    },
  } as TAuthContext)
})

describe.skip('Resource', () => {
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
  })
})

afterEach(() => {
  server.resetHandlers()
  vi.resetAllMocks()
})

it('renders correctly', () => {
  render(<Category />)

  expect(screen.getByTestId('filters-container')).toBeInTheDocument()
  expect(screen.getByTestId('types-filter')).toBeInTheDocument()
  expect(screen.getByTestId('status-filter')).toBeInTheDocument()
  expect(screen.getByTestId('resource-list')).toBeInTheDocument()
  expect(screen.getByText('Mis recursos')).toBeInTheDocument()
  expect(screen.getByText('Recursos favoritos')).toBeInTheDocument()
})

it('filters opens and closes correctly', () => {
  render(<Category />)

  fireEvent.click(screen.getByTestId('filters-button'))
  expect(screen.getByTestId('mobile-filters')).toBeInTheDocument()

  fireEvent.click(screen.getByTestId('close-filters-button'))
  expect(screen.queryByTestId('mobile-filters')).not.toBeInTheDocument()
})

it('create new resource modal opens and closes correctly', () => {
  render(<Category />)

  fireEvent.click(screen.getByText('+ Crear nuevo recurso'))
  expect(screen.getByText(/Nuevo Recurso/)).toBeInTheDocument()
})

it('modal opens and closes correctly when user is not logged', () => {
  vi.mocked(useAuth).mockReturnValue({
    user: null,
  } as TAuthContext)

  render(<Category />)

  fireEvent.click(screen.getByRole('button', { name: '+ Crear nuevo recurso' }))
  const modalTitle = screen.getByRole('heading', {
    name: /acceso restringido/i,
  })

  expect(modalTitle).toBeInTheDocument()
  fireEvent.keyDown(document, { key: 'Escape' })
  expect(modalTitle).not.toBeInTheDocument()
})

it('modal opens and closes correctly when user is logged', () => {
  render(<Category />)

  fireEvent.click(screen.getByRole('button', { name: '+ Crear nuevo recurso' }))
  const modalTitle = screen.getByRole('heading', {
    name: /nuevo recurso/i,
  })
  expect(modalTitle).toBeInTheDocument()
  fireEvent.keyDown(document, { key: 'Escape' })
  expect(modalTitle).not.toBeInTheDocument()
})
