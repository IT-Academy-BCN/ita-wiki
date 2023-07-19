import { setupServer } from 'msw/node'
import { fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
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

afterEach(() => {
  server.resetHandlers()
  vi.resetAllMocks()
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

  it('renders correctly', () => {
    render(<Category />)

    expect(screen.getByTestId('category-title')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '+' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Cursos' })).toBeInTheDocument()
  })

  it('modal opens and closes correctly when user is not logged', () => {
    vi.mocked(useAuth).mockReturnValue({
      user: null,
    } as TAuthContext)

    render(<Category />)

    fireEvent.click(screen.getByRole('button', { name: /\+/i }))
    const modalTitle = screen.getByRole('heading', {
      name: /acceso restringido/i,
    })
    // const modalTitle = screen.getByText(/acceso restringido/i)
    expect(modalTitle).toBeInTheDocument()
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(modalTitle).not.toBeInTheDocument()
  })

  it('modal opens and closes correctly when user is logged', () => {
    render(<Category />)

    fireEvent.click(screen.getByRole('button', { name: /\+/i }))
    const modalTitle = screen.getByRole('heading', {
      name: /nuevo recurso/i,
    })
    expect(modalTitle).toBeInTheDocument()
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(modalTitle).not.toBeInTheDocument()
  })
})
