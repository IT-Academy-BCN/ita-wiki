import { vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { render, waitFor, screen } from '@testing-library/react'
import { rest } from 'msw'
import { MyResources } from '../../components/organisms'
import { TAuthContext, useAuth } from '../../context/AuthProvider'
import { mswServer } from '../setup'
import { errorHandlers, handlers } from '../../__mocks__/handlers'
import { BrowserRouter } from 'react-router-dom'
import { server } from '../../__mocks__/server'

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

// Mock de AuthProvider
vi.mock('../../context/AuthProvider', async () => {
  const actual = await vi.importActual('../../context/AuthProvider')
  return {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ...actual,
    useAuth: vi.fn(),
  }
})

describe('MyResources', () => {
  it('renders "Inicia sesión" message when user is not logged in', () => {
    vi.mocked(useAuth).mockReturnValue({
      user: null,
    } as TAuthContext)

    render(<MyResources />)

    expect(screen.getByText('Inicia sesión')).toBeInTheDocument()
  })
})
