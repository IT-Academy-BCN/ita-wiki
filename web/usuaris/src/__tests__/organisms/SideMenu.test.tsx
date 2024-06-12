import { fireEvent, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { colors } from '@itacademy/ui'
import { render } from '../test-utils'
import { SideMenu } from '../../components/organisms'
import { paths } from '../../constants'
import { TAuthContext, useAuth } from '../../context/AuthProvider'
import { UserRole } from '../../types'

describe('SideMenu', () => {
  beforeEach(() => {
    vi.mock('../../context/AuthProvider', async () => {
      const actual = await vi.importActual('../../context/AuthProvider')
      return {
        ...actual,
        useAuth: vi.fn(),
      }
    })
  })

  it('renders correctly', async () => {
    vi.mocked(useAuth).mockReturnValue({
      user: {
        dni: '12345678A',
        email: 'user@example.cat',
        role: UserRole.ADMIN,
      },
    } as TAuthContext)
    render(<SideMenu />)

    expect(screen.getByAltText('IT Academy')).toBeInTheDocument()
    const usersItem = screen.getByTestId('menu-title-usuarios')
    const mentorsItem = screen.getByTestId('menu-title-mentores')
    const connectorItem = screen.getByTestId('menu-title-connector')
    const settingsItem = screen.getByTestId('menu-title-configuración')

    expect(usersItem).toBeInTheDocument()
    expect(mentorsItem).toBeInTheDocument()
    expect(connectorItem).toBeInTheDocument()
    expect(settingsItem).toBeInTheDocument()

    expect(screen.getAllByTestId('menu-icon-person').length).toBe(2)
    expect(screen.getByTestId('menu-icon-bolt')).toBeInTheDocument()
    expect(screen.getByTestId('menu-icon-settings')).toBeInTheDocument()

    waitFor(() => {
      expect(usersItem).toHaveStyle(`color: ${colors.black.black3}`)
      expect(mentorsItem).toHaveStyle(`color: ${colors.gray.gray3}`)
      expect(connectorItem).toHaveStyle(`color: ${colors.gray.gray3}`)
      expect(settingsItem).toHaveStyle(`color: ${colors.gray.gray3}`)
    })
  })

  it('navigates to the correct page when a menu item is clicked and changes styles', async () => {
    vi.mocked(useAuth).mockReturnValue({
      user: {
        dni: '12345678A',
        email: 'user@example.cat',
        role: UserRole.ADMIN,
      },
    } as TAuthContext)
    render(<SideMenu />)
    const mentorsMenuItemLink = screen.getByTestId('menu-link-mentores')
    const mentorsTitle = screen.getByTestId('menu-title-mentores')

    expect(screen.getByTestId(`menu-path-${paths.home}`)).toBeInTheDocument()
    waitFor(() => {
      expect(mentorsTitle).toHaveStyle(`color: ${colors.gray.gray3}`)
    })

    await userEvent.click(mentorsMenuItemLink)

    expect(screen.getByTestId(`menu-path-${paths.mentors}`)).toBeInTheDocument()
    waitFor(() => {
      expect(mentorsTitle).toHaveStyle(`color: ${colors.black.black3}`)
    })
  })

  it('changes style on hover over a category', () => {
    vi.mocked(useAuth).mockReturnValue({
      user: {
        dni: '12345678A',
        email: 'user@example.cat',
        role: UserRole.ADMIN,
      },
    } as TAuthContext)
    render(<SideMenu />)
    const activeCategory = screen.getByText('Usuaris')
    fireEvent.mouseOver(activeCategory)
    expect(activeCategory).toHaveStyle(`color: ${colors.black.black3}`)

    const inactiveCategory = screen.getByText('Mentors')
    fireEvent.mouseOver(inactiveCategory)
    expect(inactiveCategory).toHaveStyle(`color: ${colors.primary}`)
  })

  it('ensures menu items are focusable for accessibility', () => {
    vi.mocked(useAuth).mockReturnValue({
      user: {
        dni: '12345678A',
        email: 'user@example.cat',
        role: UserRole.ADMIN,
      },
    } as TAuthContext)
    render(<SideMenu />)
    const usersMenuItem = screen.getByTestId('menu-link-usuarios')
    usersMenuItem.focus()
    expect(usersMenuItem).toHaveFocus()
  })

  it('renders Mentors option for admin user', () => {
    vi.mocked(useAuth).mockReturnValue({
      user: {
        dni: '12345678A',
        email: 'user@example.cat',
        role: UserRole.ADMIN,
      },
    } as TAuthContext)
    render(<SideMenu />)

    const mentorsItem = screen.getByTestId('menu-title-mentores')
    expect(mentorsItem).toBeInTheDocument()
  })

  it('does not render Mentors option for mentor user', () => {
    vi.mocked(useAuth).mockReturnValue({
      user: {
        dni: '12345678A',
        email: 'user@example.cat',
        role: UserRole.MENTOR,
      },
    } as TAuthContext)
    render(<SideMenu />)

    const mentorsItem = screen.queryByTestId('menu-title-mentores')
    expect(mentorsItem).not.toBeInTheDocument()
  })
})
