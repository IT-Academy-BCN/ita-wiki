import { fireEvent, render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { colors } from '@itacademy/ui'
import { SideMenu } from '../../components/organisms'
import { icons } from '../../assets/icons'

describe('SideMenu', () => {
  let renderedComponent

  beforeEach(() => {
    renderedComponent = render(
      <BrowserRouter>
        <SideMenu />
      </BrowserRouter>
    )
  })

  it('renders correctly', () => {
    expect(screen.getByAltText('IT Academy')).toBeInTheDocument()
    expect(screen.getByText('Usuari@s')).toBeInTheDocument()
    expect(screen.getByText('Mentores')).toBeInTheDocument()
    expect(screen.getByText('Connector')).toBeInTheDocument()
    expect(screen.getByText('Configuración')).toBeInTheDocument()
  })

  it('navigates to the correct page when a menu item is clicked', () => {
    const firstMenuItem = screen.getByText('Usuari@s')
    firstMenuItem.click()
    expect(window.location.pathname).toEqual('/')
  })

  it('changes style on hover over a category', () => {
    const category = screen.getByText('Usuari@s')
    fireEvent.mouseOver(category)
    expect(category).toHaveStyle(`color: ${colors.primary}`)
  })

  it('displays the correct icons for each menu item', () => {
    const userIcon = screen.getByAltText('Usuari@s')
    expect(userIcon).toHaveAttribute('src', icons.user)

    const mentorIcon = screen.getByAltText('Mentores')
    expect(mentorIcon).toHaveAttribute('src', icons.user)

    const connectorIcon = screen.getByAltText('Connector')
    expect(connectorIcon).toHaveAttribute('src', icons.thunder)

    const settingsIcon = screen.getByAltText('Configuración')
    expect(settingsIcon).toHaveAttribute('src', icons.settings)
  })

  it('ensures menu items are focusable for accessibility', () => {
    const firstMenuItem = screen.getByText('Usuari@s')
    firstMenuItem.focus()
    expect(firstMenuItem).toHaveFocus()
  })
})
