import { fireEvent, render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { colors } from '@itacademy/ui'
import { describe, beforeEach, it, expect } from 'vitest'
import { SideMenu } from '../../components/organisms'

describe('SideMenu', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <SideMenu />
      </BrowserRouter>
    )
  })

  it('renders correctly', () => {
    expect(screen.getByAltText('IT Academy')).toBeInTheDocument()
    expect(screen.getByText('Usuarios')).toBeInTheDocument()
    expect(screen.getByText('Mentores')).toBeInTheDocument()
    expect(screen.getByText('Connector')).toBeInTheDocument()
    expect(screen.getByText('Configuración')).toBeInTheDocument()
  })

  it('navigates to the correct page when a menu item is clicked', () => {
    const firstMenuItem = screen.getByText('Usuarios')
    fireEvent.click(firstMenuItem)
    expect(window.location.pathname).toEqual('/')
  })

  it('changes style on hover over a category', () => {
    const category = screen.getByText('Usuarios')
    fireEvent.mouseOver(category)
    expect(category).toHaveStyle(`color: ${colors.primary}`)
  })

  it('displays the correct icons for each menu item', () => {
    const personIcons = screen.getAllByTestId('person')
    expect(personIcons.length).toBe(2)

    const boltIcon = screen.getByTestId('bolt')
    expect(boltIcon).toBeInTheDocument()

    const settingsIcon = screen.getByTestId('settings')
    expect(settingsIcon).toBeInTheDocument()
  })

  it('ensures menu items are focusable for accessibility', () => {
    const firstMenuItem = screen.getByText('Usuarios')
    firstMenuItem.focus()
    expect(firstMenuItem).toHaveFocus()
  })
})
