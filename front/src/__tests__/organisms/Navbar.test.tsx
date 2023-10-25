import { expect, vi } from 'vitest'
import { Routes, Route } from 'react-router-dom'
import { Navbar } from '../../components/organisms/Navbar'
import { render, screen, fireEvent, waitFor } from '../test-utils'
import { TAuthContext, useAuth } from '../../context/AuthProvider'

const toggleModalMock = vi.fn()
const handleAccessModalMock = vi.fn()

beforeEach(() => {
  vi.mock('../../context/AuthProvider', async () => {
    const actual: Record<number, unknown> = await vi.importActual(
      '../../context/AuthProvider'
    )
    return {
      ...actual,
      useAuth: vi.fn(),
    }
  })
  vi.mocked(useAuth).mockReturnValue({
    user: {
      name: 'TestName',
      avatar: 'TestAvatar',
      role: 'REGISTERED',
    },
  } as TAuthContext)
})

afterEach(() => {
  vi.resetAllMocks()
})

describe('Navbar', () => {
  vi.mocked(useAuth).mockReturnValue({
    user: null,
  } as TAuthContext)
  it('renders Navbar component correctly', () => {
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

    const settingsButton = screen.queryByTestId('settings-button')

    expect(settingsButton).not.toBeInTheDocument()
  })

  it('changes language using the language dropdown in the Navbar', () => {
    vi.mocked(useAuth).mockReturnValue({
      user: null,
    } as TAuthContext)
    render(<Navbar />)

    expect(screen.getByText('CAT')).toBeInTheDocument()

    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'es' } })

    expect(screen.getByText('ES')).toBeInTheDocument()
  })

  it('does not render new-post-button nor access-modal on the Homepage', () => {
    render(<Navbar />)

    const newPostButton = screen.queryByTestId('new-post-button')
    expect(newPostButton).not.toBeInTheDocument()

    const accessModal = screen.queryByTestId('access-modal')
    expect(accessModal).not.toBeInTheDocument()
  })

  it('renders Navbar items on non-homepage pages', () => {
    render(
      <Routes>
        <Route path="/category/:slug" element={<Navbar />} />
      </Routes>,
      {
        initialEntries: ['/category/react'],
      }
    )

    const menuItems = screen.queryAllByRole('button')
    expect(menuItems.length).toBeGreaterThan(0)
  })

  it('displays the "Añadir recursos" modal if the user is logged in', async () => {
    render(
      <Routes>
        <Route
          path="/category/:slug"
          element={
            <Navbar
              toggleModal={toggleModalMock}
              handleAccessModal={handleAccessModalMock}
            />
          }
        />
      </Routes>,
      {
        initialEntries: ['/category/react'],
      }
    )

    const addButton = screen.getByTestId('new-post-button')
    expect(addButton).toBeInTheDocument()

    fireEvent.click(addButton)
    expect(toggleModalMock).toHaveBeenCalledTimes(1)
  })

  it('displays an "Access Modal" when unregistered users attempt to add new resources', async () => {
    vi.mocked(useAuth).mockReturnValue({
      user: null,
    } as TAuthContext)
    render(
      <Routes>
        <Route
          path="/category/:slug"
          element={
            <Navbar
              toggleModal={toggleModalMock}
              handleAccessModal={handleAccessModalMock}
            />
          }
        />
      </Routes>,
      {
        initialEntries: ['/category/react'],
      }
    )

    const addButton = screen.getByTestId('new-post-button')
    expect(addButton).toBeInTheDocument()

    fireEvent.click(addButton)
    expect(handleAccessModalMock).toHaveBeenCalledTimes(1)
  })

  it('should not render Settings button when user is a student', () => {
    vi.mocked(useAuth).mockReturnValue({
      user: {
        name: 'TestName',
        avatar: 'TestAvatar',
        role: 'REGISTERED',
      },
    } as TAuthContext)
    render(<Navbar />)

    const settingsButton = screen.queryByTestId('settings-button')

    expect(settingsButton).not.toBeInTheDocument()
  })

  it('should render Settings button when user is a mentor', async () => {
    vi.mocked(useAuth).mockReturnValue({
      user: {
        name: 'TestName',
        avatar: 'TestAvatar',
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
