import { setupServer } from 'msw/node'
import { fireEvent, getByTitle } from '@testing-library/react'
import { vi } from 'vitest'
import { render, screen } from '../test-utils'
import { NewCategory } from '../../pages'
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

// beforeEach(() => {
//   vi.mocked(useAuth).mockReturnValue({
//     user: {
//       name: 'Name',
//       avatar: 'Avatar',
//     },
//   } as TAuthContext)
// })

afterEach(() => {
  server.resetHandlers()
  vi.resetAllMocks()
})

it('renders correctly', () => {
  render(<NewCategory />)

  expect(screen.getByTestId('filters-container')).toBeInTheDocument()
  expect(screen.getByTestId('types-filter')).toBeInTheDocument()
  expect(screen.getByTestId('status-filter')).toBeInTheDocument()
  expect(screen.getByTestId('resource-card')).toBeInTheDocument()
  expect(screen.getByText('Mis recursos')).toBeInTheDocument()
  expect(screen.getByText('Recursos favoritos')).toBeInTheDocument()
})
