import { vi } from 'vitest'
import { Navbar } from '../../components/organisms/Navbar'
import { render, screen } from '../test-utils'
import { TAuthContext, useAuth } from '../../context/AuthProvider'

vi.mock('../../context/AuthProvider', async () => {
  const actual = await vi.importActual('../../context/AuthProvider')
  return {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ...actual,
    useAuth: vi.fn(),
  }
})

describe('Navbar', () => {
  it('renders Navbar component', () => {
    vi.mocked(useAuth).mockReturnValue({
      user: null,
    } as TAuthContext)

    render(<Navbar title="Test Title" />)

    const titleElement = screen.getByText('Test Title')
    expect(titleElement).toBeInTheDocument()
    expect(screen.queryByTestId('avatarImage')).not.toBeInTheDocument()
  })

  it('shows avatar image if user is set', () => {
    vi.mocked(useAuth).mockReturnValue({
      user: {
        name: 'Hola',
        avatar: 'Adios',
      },
    } as TAuthContext)

    render(<Navbar title="Test Title" />)

    expect(screen.getByTestId('avatarImage')).toBeInTheDocument()
  })
})
