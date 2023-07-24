import { render, screen } from '../test-utils'
import { UserProfile } from '../../pages'

describe('UserProfile', () => {
  it('renders correctly with correct props and a return button', async () => {
    render(<UserProfile />)

    expect(screen.getByRole('button', { name: /arrow_back_ios volver/i }))

    const resourcesElement = await screen.findByTestId(/aportaciones/i)
    expect(resourcesElement).toHaveTextContent('1')
    const votesElement = await screen.findByTestId(/votos recibidos/i)
    expect(votesElement).toHaveTextContent('8')
    const favoritesElement = await screen.findByTestId(/Favoritos guardados/i)
    expect(favoritesElement).toHaveTextContent('1')
  })
})
