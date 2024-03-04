import { screen } from '@testing-library/react'
import { render } from '../test-utils'
import { Home } from '../../pages'

describe('Home page', () => {
  it('renders correctly', () => {
    render(<Home />)

    expect(screen.getByText('Connector')).toBeInTheDocument()
    expect(screen.getByRole('main')).toHaveStyle('background-color: #FFFFFF')
  })
})
