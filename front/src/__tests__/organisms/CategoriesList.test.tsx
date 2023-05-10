import { render, screen, waitFor } from '../test-utils'
import { CategoriesList } from '../../components/organisms'
import { mswServer } from '../setup'
import { errorHandlers } from '../../__mocks__/handlers'

describe('CategoriesList', () => {
  it('renders correctly on success', async () => {
    render(<CategoriesList />)

    await waitFor(() =>
      expect(screen.getByText('Loading...')).toBeInTheDocument()
    )

    await waitFor(() => {
      expect(screen.getByText('Categorías')).toBeInTheDocument()
      // expect(screen.findAllByText('React')).toBeInTheDocument()
    })
  })

  it('renders correctly on error', async () => {
    mswServer.use(...errorHandlers)
    render(<CategoriesList />)

    await waitFor(() =>
      expect(screen.getByText('Loading...')).toBeInTheDocument()
    )

    await waitFor(() => {
      expect(screen.getByText('Ha habido un error...')).toBeInTheDocument()
    })
  })
})
