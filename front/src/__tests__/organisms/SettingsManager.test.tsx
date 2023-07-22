import { render, screen, waitFor, fireEvent } from '../test-utils'
import { SettingsManager } from '../../components/organisms'

describe('SettingsManager component', () => {
  it('renders correctly', () => {
    render(<SettingsManager />)

    expect(screen.getByText(/temas/i)).toBeInTheDocument()
    expect(screen.getByText(/usuarios/i)).toBeInTheDocument()
    expect(screen.getByText('Topics Manager')).toBeInTheDocument()
    expect(screen.queryByText('Users Manager')).not.toBeInTheDocument()

    screen.debug()
  })

  it('should change content tab according to click on menu tab', async () => {
    render(<SettingsManager />)

    fireEvent.click(screen.getByText(/usuarios/i))

    await waitFor(() =>
      expect(screen.getByText('Users Manager')).toBeInTheDocument()
    )
    expect(screen.queryByText('Topics Manager')).not.toBeInTheDocument()
  })
})
