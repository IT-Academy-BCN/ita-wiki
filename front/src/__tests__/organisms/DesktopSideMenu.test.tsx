import { render, screen } from '../test-utils'
import { DesktopSideMenu } from '../../components/organisms'

describe('DesktopSideMenu component', () => {
  it('renders correctly', () => {
    render(<DesktopSideMenu />)

    expect(screen.getByAltText('IT Academy')).toBeInTheDocument()
  })
})
