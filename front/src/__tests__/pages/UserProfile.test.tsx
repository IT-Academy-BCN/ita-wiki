import { vi } from 'vitest'
import { render, screen } from '../test-utils'
import { UserProfile } from '../../pages'
import { TAuthContext, useAuth } from '../../context/AuthProvider'

describe('UserProfile', () => {
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
  it('renders correctly BackButton and CardProfile when user is logged', () => {
    vi.mocked(useAuth).mockReturnValue({
      user: {
        name: 'Hola',
        avatar: 'Adios',
      },
    } as TAuthContext)
    render(<UserProfile />)
    const backButtonElement = screen.getByRole('button', {
      name: /arrow_back_ios volver/i,
    })
    expect(backButtonElement).toBeInTheDocument()

    const cardProfileElement = screen.getByTestId('card-profile') // Asegúrate de que el atributo data-testid se configure en CardProfile
    expect(cardProfileElement).toBeInTheDocument()
  })
})
