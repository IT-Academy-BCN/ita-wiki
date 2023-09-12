import { render, screen, waitFor, fireEvent } from '../test-utils'
import { SettingsManager } from '../../components/organisms'

describe('SettingsManager component', () => {
  it('renders correctly', () => {
    render(<SettingsManager />)

    expect(screen.getByText('Temas')).toBeInTheDocument()
    expect(screen.getByText(/usuarios/i)).toBeInTheDocument()
    expect(
      screen.getByText(
        'No hay temas disponibles. Accede desde una categoría para ver o gestionar sus temas.'
      )
    ).toBeInTheDocument()
    expect(screen.queryByText('Users Manager')).not.toBeInTheDocument()
  })

  it('should change content tab according to click on menu tab', async () => {
    render(<SettingsManager />)

    fireEvent.click(screen.getByText(/usuarios/i))

    await waitFor(() =>
      expect(screen.getByText('Users Manager')).toBeInTheDocument()
    )

    expect(
      screen.queryByText(
        'No hay temas disponibles. Accede desde una categoría para ver o gestionar sus temas.'
      )
    ).not.toBeInTheDocument()
  })
})
