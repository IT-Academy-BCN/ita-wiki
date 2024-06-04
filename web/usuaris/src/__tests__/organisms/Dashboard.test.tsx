import { screen } from '@testing-library/react'
import { render } from '../test-utils'
import { Dashboard } from '../../components/organisms'

describe('Dashboard', () => {
  it('renders correctly', () => {
    render(<Dashboard />)

    const mainDiv = screen.getByRole('main')
    const sideMenuElement = screen.getByText(/Mentors/i)
    const filtersWidgetElement = screen.getByAltText(/Calendar/i)
    const actionsDropdown = screen.getByTestId('actions-dropdown')

    expect(mainDiv).toBeInTheDocument()
    expect(sideMenuElement).toBeInTheDocument()
    expect(filtersWidgetElement).toBeInTheDocument()
    expect(actionsDropdown).toBeInTheDocument()
  })
})
