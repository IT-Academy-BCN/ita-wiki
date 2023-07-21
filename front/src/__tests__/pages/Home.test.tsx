import { vi } from 'vitest'
import { render, fireEvent, screen } from '../test-utils'
import { TAuthContext, useAuth } from '../../context/AuthProvider'
import { Home } from '../../pages'

describe('Home page', () => {
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

  it('Renders correctly', () => {
    vi.mocked(useAuth).mockReturnValue({
      user: {
        name: 'Hola',
        avatar: 'Adios',
      },
    } as TAuthContext)
    render(<Home />)

    expect(screen.getByText(/vota los recursos/i)).toBeInTheDocument()
    expect(
      screen.getByText(/¡Bienvenid@ a la wiki de la IT Academy!/)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Funcionalidades básicas que te ofrece esta plataforma:/)
    ).toBeInTheDocument()
  })

  it('shows signup button if user is not logged in', () => {
    vi.mocked(useAuth).mockReturnValue({
      user: null,
    } as TAuthContext)
    render(<Home />)

    expect(screen.getByText(/entrar/i)).toBeInTheDocument()
  })

  it('does not show signup button if user is logged in', () => {
    vi.mocked(useAuth).mockReturnValue({
      user: {
        name: 'Hola',
        avatar: 'Adios',
      },
    } as TAuthContext)
    render(<Home />)

    expect(screen.queryByText(/registrarme/i)).not.toBeInTheDocument()

  })

  it('shows register modal when user clicks its button', () => {
    vi.mocked(useAuth).mockReturnValue({
      user: null,
    } as TAuthContext)
    render(<Home />)

    fireEvent.click(screen.getByText(/entrar/i))
    const modalTitle = screen.getAllByText(/login/i)
    expect(modalTitle[0]).toBeInTheDocument()
  })
})
