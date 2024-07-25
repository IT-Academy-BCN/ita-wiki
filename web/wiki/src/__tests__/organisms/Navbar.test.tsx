import { expect, vi } from 'vitest'
import { useLocation } from 'react-router-dom'
import { Navbar } from '../../components/organisms/Navbar'
import { render, screen, fireEvent, waitFor } from '../test-utils'
import { TAuthContext, useAuth } from '../../context/AuthProvider'

const toggleModalMock = vi.fn()
const handleAccessModalMock = vi.fn()

const defaultLocation = {
  search: '',
  hash: '',
  key: '',
  state: '',
}

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
      role: 'REGISTERED',
    },
  } as TAuthContext)
  vi.mock('react-router-dom', async () => {
    const actual: Record<number, unknown> = await vi.importActual(
      'react-router-dom'
    )
    return {
      ...actual,
      useLocation: vi.fn(),
    }
  })
  vi.mocked(useLocation).mockReturnValue({
    ...defaultLocation,
    pathname: '/',
  }) as unknown as Location
})

afterEach(() => {
  vi.resetAllMocks()
})

describe('Navbar', () => {
  it('renders Navbar component correctly', () => {
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

    const newPostButton = screen.queryByTestId('new-post-button')
    expect(newPostButton).not.toBeInTheDocument()

    const settingsButton = screen.queryByTestId('settings-button')
    expect(settingsButton).not.toBeInTheDocument()
  })

  it('changes language using the language dropdown in the Navbar', () => {
    vi.mocked(useLocation).mockReturnValue({
      ...defaultLocation,
      pathname: '/category/react',
    }) as unknown as Location
    render(<Navbar />)

    expect(screen.getByText('CAT')).toBeInTheDocument()
    expect(screen.getByText('EN')).toBeInTheDocument()

    expect(screen.getByTitle('Afegeix un recurs')).toBeInTheDocument()

    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'en' } })

    expect(screen.getByTitle('Add resource')).toBeInTheDocument()
  })

  it('does not render new-post-button nor access-modal on the Homepage', () => {
    render(<Navbar />)

    const newPostButton = screen.queryByTestId('new-post-button')
    expect(newPostButton).not.toBeInTheDocument()

    const accessModal = screen.queryByTestId('access-modal')
    expect(accessModal).not.toBeInTheDocument()
  })

  it('does not render new-post-button nor access-modal on the Profile', () => {
    vi.mocked(useLocation).mockReturnValue({
      ...defaultLocation,
      pathname: '/profile',
    }) as unknown as Location
    render(<Navbar />)

    const newPostButton = screen.queryByTestId('new-post-button')
    expect(newPostButton).not.toBeInTheDocument()

    const accessModal = screen.queryByTestId('access-modal')
    expect(accessModal).not.toBeInTheDocument()
  })

  it('renders Navbar items on Category page', () => {
    vi.mocked(useLocation).mockReturnValue({
      ...defaultLocation,
      pathname: '/category/react',
    }) as unknown as Location
    render(<Navbar />)

    const menuItems = screen.queryAllByRole('button')
    expect(menuItems.length).toBeGreaterThan(0)

    const newPostButton = screen.getByTestId('new-post-button')
    expect(newPostButton).toBeInTheDocument()
  })

  it('displays the "Añadir recursos" modal if the user is logged in', async () => {
    vi.mocked(useLocation).mockReturnValue({
      ...defaultLocation,
      pathname: '/category/react',
    }) as unknown as Location
    render(
      <Navbar
        toggleModal={toggleModalMock}
        handleAccessModal={handleAccessModalMock}
      />
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
    vi.mocked(useLocation).mockReturnValue({
      ...defaultLocation,
      pathname: '/category/react',
    }) as unknown as Location
    render(
      <Navbar
        toggleModal={toggleModalMock}
        handleAccessModal={handleAccessModalMock}
      />
    )

    const addButton = screen.getByTestId('new-post-button')
    expect(addButton).toBeInTheDocument()

    fireEvent.click(addButton)
    expect(handleAccessModalMock).toHaveBeenCalledTimes(1)
  })

  it('should not render Settings button when user is a student', () => {
    render(<Navbar />)

    const settingsButton = screen.queryByTestId('settings-button')

    expect(settingsButton).not.toBeInTheDocument()
  })

  it('should render Settings button when user is a mentor', async () => {
    vi.mocked(useAuth).mockReturnValue({
      user: {
        name: 'TestName',
        role: 'MENTOR',
      },
    } as TAuthContext)

    render(<Navbar />)

    const settingsButton = screen.getByTestId('settings-button')

    expect(settingsButton).toBeInTheDocument()

    fireEvent.click(settingsButton)
    await waitFor(() => expect(screen.getByText('Settings')).toBeVisible())
  })
  it('toggles search bar on click', () => {
    vi.mocked(useLocation).mockReturnValue({
      ...defaultLocation,
      pathname: '/',
    }) as unknown as Location

    const toggleSearchMock = vi.fn()

    render(<Navbar toggleSearch={toggleSearchMock} />)

    const searchButton = screen.getByTestId('search-button')

    expect(toggleSearchMock).not.toHaveBeenCalled()

    fireEvent.click(searchButton)
    expect(toggleSearchMock).toHaveBeenCalledTimes(1)

    fireEvent.click(searchButton)
    expect(toggleSearchMock).toHaveBeenCalledTimes(2)
  })
})
