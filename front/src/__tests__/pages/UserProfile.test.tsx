import { setupServer } from 'msw/node'
import { vi } from 'vitest'
import { render, screen, waitFor } from '../test-utils'
import { UserProfile } from '../../pages'
import { handlers } from '../../__mocks__/handlers'

const server = setupServer(...handlers)

beforeAll(() => server.listen())

afterEach(() => {
  server.resetHandlers()
  vi.resetAllMocks()
})
afterAll(() => server.close())

describe('UserProfile', () => {
  it('renders correctly with return button', async () => {
    render(<UserProfile />)
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /arrow_back_ios volver/i }))
      expect(screen.getByTestId(/aportaciones/i)).toHaveTextContent('1')
      expect(screen.getByTestId(/votos recibidos/i)).toHaveTextContent('8')
      expect(screen.getByTestId(/favoritos guardados/i)).toHaveTextContent('1')
    })
  })
})



