import { vi } from 'vitest'
import { Navbar } from '../../components/organisms/Navbar'
import { render, screen, fireEvent, waitFor } from '../test-utils'
import { TAuthContext, useAuth } from '../../context/AuthProvider'

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

afterEach(() => {
  vi.restoreAllMocks()
})

describe('Navbar', () => {
  it('renders Navbar component', () => {
    vi.mocked(useAuth).mockReturnValue({
      user: null,
    } as TAuthContext)
    render(<Navbar />)

    const menuButton = screen.getByTestId('hamburger-menu')
    expect(menuButton).toBeInTheDocument()

    const menuItems = screen.getByTestId('menu-items')
    expect(menuItems).toBeInTheDocument()
    expect(menuItems).toHaveStyle('transform: translateX(-100%)')

    fireEvent.click(menuButton)
    expect(menuItems).toHaveStyle('transform: translateX(0)')

    fireEvent.click(menuButton)
    expect(menuItems).toHaveStyle('transform: translateX(-100%)')

    const newPostButton = screen.getByTestId('new-post-button')
    expect(newPostButton).toBeInTheDocument()
    fireEvent.click(newPostButton)

    expect(screen.queryByTestId('settings-button')).not.toBeInTheDocument()
  })

  it('does not show settings button if user logged in is not a mentor/admin', () => {
    vi.mocked(useAuth).mockReturnValue({
      user: {
        name: 'Name',
        avatar: 'Avatar',
        role: 'REGISTERED',
      },
    } as TAuthContext)
    render(<Navbar />)

    expect(screen.queryByTestId('settings-button')).not.toBeInTheDocument()
  })

  it('shows settings button if a mentor is logged in', async () => {
    vi.mocked(useAuth).mockReturnValue({
      user: {
        name: 'Name',
        avatar: 'Avatar',
        role: 'MENTOR',
      },
    } as TAuthContext)
    render(<Navbar />)

    const settingsButton = screen.getByTestId('settings-button')

    expect(settingsButton).toBeInTheDocument()

    fireEvent.click(settingsButton)
    await waitFor(() => expect(screen.getByText('Ajustes')).toBeVisible())
  })
})
