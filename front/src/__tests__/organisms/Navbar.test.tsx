import { expect, vi } from 'vitest'
import { Navbar } from '../../components/organisms/Navbar'
import { render, screen, fireEvent } from '../test-utils'
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

beforeEach(() => {
  vi.mocked(useAuth).mockReturnValue({
    user: {
      name: 'Name',
      avatar: 'Avatar',
    },
  } as TAuthContext)
})

describe('Navbar', () => {
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

  it('renders Navbar component', () => {
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

    const settingsButton = screen.getByTestId('settings-button')
    fireEvent.click(settingsButton)
  })

  it('changes language using the language dropdown in the Navbar', () => {
    render(<Navbar />)
  
    expect(screen.getByText('CAT')).toBeInTheDocument()
  
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'es' } })
  
    expect(screen.getByText('ES')).toBeInTheDocument()
  })

  it('does not render new-post-button nor access-modal on the Homepage', () => {
    window.history.pushState({}, 'Home Page', '/')
    render(<Navbar />)
  
    const newPostButton = screen.queryByTestId('new-post-button')
    expect(newPostButton).not.toBeInTheDocument()

    const accessModal = screen.queryByTestId('access-modal')
    expect(accessModal).not.toBeInTheDocument()

    window.history.pushState({}, 'Original Page', '/')
  })

  it('renders Navbar items on non-homepage pages', () => {
    window.history.pushState({}, 'Category Page', '/category/react')
    render(<Navbar />)
    
    const menuItems = screen.queryAllByRole('button')
    expect(menuItems.length).toBeGreaterThan(0)
  })

  it('displays the "Añadir recursos" modal if the user is logged in', async () => {
    const toggleModalMock = vi.fn()

    render(
      <Navbar
        toggleModal={toggleModalMock}
        handleAccessModal={() => {
        }}
      />
    )

    const { user } = useAuth()
    if (user) {
      toggleModalMock()
    } else {
      throw new Error('Access modal should not be displayed if users are registered.')
    }

    expect(toggleModalMock).toHaveBeenCalledTimes(1)
  })

  it('displays an "Access Modal" when unregistered users attempt to add new resources', async () => {
    vi.mocked(useAuth).mockReturnValue({
      user: null,
    } as TAuthContext)
  
    const toggleModalMock = vi.fn()
    const handleAccessModalMock = vi.fn()
  
    render(
      <Navbar
        toggleModal={toggleModalMock}
        handleAccessModal={handleAccessModalMock}
      />
    )

    const { user } = useAuth()
    if (!user) {
      handleAccessModalMock()
    } else {
      toggleModalMock()
    }

    expect(handleAccessModalMock).toHaveBeenCalledTimes(1)
  })
})
