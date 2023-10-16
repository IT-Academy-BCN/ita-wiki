import { expect, vi } from 'vitest'
import { Routes, Route } from 'react-router-dom'
import { Navbar } from '../../components/organisms/Navbar'
import { render, screen, fireEvent } from '../test-utils'

const toggleModalMock = vi.fn()
const handleAccessModalMock = vi.fn()

describe('Navbar', () => {
  it('renders Navbar component', () => {
    render(<Navbar isUserLogged />)

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

    expect(settingsButton).toBeInTheDocument()

    fireEvent.click(settingsButton)
    await waitFor(() => expect(screen.getByText('Ajustes')).toBeVisible())
  })

  it('changes language using the language dropdown in the Navbar', () => {
    render(<Navbar isUserLogged={false} />)

    expect(screen.getByText('CAT')).toBeInTheDocument()

    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'es' } })

    expect(screen.getByText('ES')).toBeInTheDocument()
  })

  it('does not render new-post-button nor access-modal on the Homepage', () => {
    render(<Navbar isUserLogged />)

    const newPostButton = screen.queryByTestId('new-post-button')
    expect(newPostButton).not.toBeInTheDocument()

    const accessModal = screen.queryByTestId('access-modal')
    expect(accessModal).not.toBeInTheDocument()
  })

  it('renders Navbar items on non-homepage pages', () => {
    render(
      <Routes>
        <Route path="/category/:slug" element={<Navbar isUserLogged />} />
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
              isUserLogged
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
    render(
      <Routes>
        <Route
          path="/category/:slug"
          element={
            <Navbar
              isUserLogged={false}
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

  it('changes language using the language dropdown in the Navbar', () => {
    render(<Navbar isUserLogged={false} />)

    expect(screen.getByText('CAT')).toBeInTheDocument()

    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'es' } })

    expect(screen.getByText('ES')).toBeInTheDocument()
  })

  it('does not render new-post-button nor access-modal on the Homepage', () => {
    render(<Navbar isUserLogged />)

    const newPostButton = screen.queryByTestId('new-post-button')
    expect(newPostButton).not.toBeInTheDocument()

    const accessModal = screen.queryByTestId('access-modal')
    expect(accessModal).not.toBeInTheDocument()
  })

  it('renders Navbar items on non-homepage pages', () => {
    render(
      <Routes>
        <Route path="/category/:slug" element={<Navbar isUserLogged />} />
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
              isUserLogged
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
    render(
      <Routes>
        <Route
          path="/category/:slug"
          element={
            <Navbar
              isUserLogged={false}
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
})
