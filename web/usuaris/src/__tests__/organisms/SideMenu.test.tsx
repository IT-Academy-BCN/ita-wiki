import { fireEvent, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { colors } from '@itacademy/ui'
import { render } from '../test-utils'
import { SideMenu } from '../../components/organisms'
import { paths } from '../../constants'

describe('SideMenu', () => {
  beforeEach(() => {
    render(<SideMenu />)
  })

  it('renders correctly', async () => {
    expect(screen.getByAltText('IT Academy')).toBeInTheDocument()
    const usersItem = screen.getByTestId('test-title-Usuarios')
    const mentorsItem = screen.getByTestId('test-title-Mentores')
    const connectorItem = screen.getByTestId('test-title-Connector')
    const settingsItem = screen.getByTestId('test-title-Configuración')

    expect(usersItem).toBeInTheDocument()
    expect(mentorsItem).toBeInTheDocument()
    expect(connectorItem).toBeInTheDocument()
    expect(settingsItem).toBeInTheDocument()

    expect(screen.getAllByTestId('test-icon-person').length).toBe(2)
    expect(screen.getByTestId('test-icon-bolt')).toBeInTheDocument()
    expect(screen.getByTestId('test-icon-settings')).toBeInTheDocument()

    waitFor(() => {
      expect(usersItem).toHaveStyle(`color: ${colors.black.black3}`)
      expect(mentorsItem).toHaveStyle(`color: ${colors.gray.gray3}`)
      expect(connectorItem).toHaveStyle(`color: ${colors.gray.gray3}`)
      expect(settingsItem).toHaveStyle(`color: ${colors.gray.gray3}`)
    })
  })

  it('navigates to the correct page when a menu item is clicked and changes styles', async () => {
    const mentorsMenuItemLink = screen.getByTestId('test-link-Mentores')
    const mentorsTitle = screen.getByTestId('test-title-Mentores')

    expect(screen.getByTestId(`test-path-${paths.home}`)).toBeInTheDocument()
    waitFor(() => {
      expect(mentorsTitle).toHaveStyle(`color: ${colors.gray.gray3}`)
    })

    await userEvent.click(mentorsMenuItemLink)

    expect(screen.getByTestId(`test-path-${paths.mentors}`)).toBeInTheDocument()
    waitFor(() => {
      expect(mentorsTitle).toHaveStyle(`color: ${colors.black.black3}`)
    })
  })

  it('changes style on hover over a category', () => {
    const activeCategory = screen.getByText('Usuaris')
    fireEvent.mouseOver(activeCategory)
    expect(activeCategory).toHaveStyle(`color: ${colors.black.black3}`)

    const inactiveCategory = screen.getByText('Mentors')
    fireEvent.mouseOver(inactiveCategory)
    expect(inactiveCategory).toHaveStyle(`color: ${colors.primary}`)
  })

  it('ensures menu items are focusable for accessibility', () => {
    const usersMenuItem = screen.getByTestId('test-link-Usuarios')
    usersMenuItem.focus()
    expect(usersMenuItem).toHaveFocus()
  })
})
