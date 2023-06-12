import { TopicsRadioWidget } from '../../components/organisms'
import { render, screen, waitFor } from '../test-utils'
import { mswServer } from '../setup'
import { errorHandlers } from '../../__mocks__/handlers'

describe('TopicsRadioWidget', () => {
  it('renders correctly on succesfull API call', async () => {
    render(<TopicsRadioWidget slug="react" />)

    const spinnerComponent = screen.getByRole('status') as HTMLDivElement
    expect(spinnerComponent).toBeInTheDocument()

    await waitFor(() => {
      const option1 = screen.getByText('Listas')
      expect(option1).toBeInTheDocument()
    })
  })

  it('renders correctly when there is an error during the fetch', async () => {
    mswServer.use(...errorHandlers)
    render(<TopicsRadioWidget slug="invalid-slug" />)

    const spinnerComponent = screen.getByRole('status') as HTMLDivElement
    expect(spinnerComponent).toBeInTheDocument()

    await waitFor(() => {
      const errMsg = screen.getByText('Ha habido un error...')
      expect(errMsg).toBeInTheDocument()
    })
  })
})
