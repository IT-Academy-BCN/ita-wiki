import { render, screen, waitFor, fireEvent } from '../test-utils'
import { SettingsManager } from '../../components/organisms'

describe('SettingsManager component', () => {
  it('renders correctly', () => {
    render(<SettingsManager />)

    expect(screen.getByText('Temes')).toBeInTheDocument()
    expect(screen.getByText(/usuaris/i)).toBeInTheDocument()
    expect(
      screen.getByText(
        /No hi ha temes disponibles. *Accedeix des d'una categoria per veure o gestionar els temes./
      )
    ).toBeInTheDocument()
    expect(screen.queryByText('Users Manager')).not.toBeInTheDocument()
  })

  it('should change content tab according to click on menu tab', async () => {
    render(<SettingsManager />)

    fireEvent.click(screen.getByText(/usuaris/i))

    await waitFor(() =>
      expect(screen.getByText('Users Manager')).toBeInTheDocument()
    )

    expect(
      screen.queryByText(
        /No hi ha temes disponibles. *Accedeix des d'una categoria per veure o gestionar els temes./
      )
    ).not.toBeInTheDocument()
  })
})
