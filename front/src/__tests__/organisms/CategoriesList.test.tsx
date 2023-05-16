import { render, screen, waitFor } from '../test-utils'
import { CategoriesList } from '../../components/organisms'
import { mswServer } from '../setup'
import { errorHandlers } from '../../__mocks__/handlers'

describe('CategoriesList', () => {
  it('renders correctly on success', async () => {
    render(<CategoriesList />)

    const spinnerComponent = screen.getByRole('status') as HTMLDivElement

    await waitFor(() => expect(spinnerComponent).toBeInTheDocument())

    await waitFor(() => {
      expect(screen.getByText('Categorías')).toBeInTheDocument()
      expect(screen.queryAllByText('React').length).toBeGreaterThan(0)
    })
  })

  it('renders correctly on error', async () => {
    mswServer.use(...errorHandlers)
    render(<CategoriesList />)

    const spinnerComponent = screen.getByRole('status') as HTMLDivElement

    await waitFor(() => expect(spinnerComponent).toBeInTheDocument())

    await waitFor(() => {
      expect(screen.getByText('Ha habido un error...')).toBeInTheDocument()
    })
  })
})
