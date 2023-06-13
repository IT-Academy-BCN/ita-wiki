import { TopicsRadioWidget } from '../../components/organisms'
import { fireEvent, render, screen, waitFor } from '../test-utils'
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
      screen.debug()
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

  it('The user can select another radio option', async () => {
    render(<TopicsRadioWidget slug="react" />)

    await waitFor(() => {
      const option1 = screen.getByLabelText(/listas/i)
      const option2 = screen.getByLabelText(/renderizado condicional/i)

      expect(option1).toBeChecked()
      fireEvent.click(option2)
      expect(option1).not.toBeChecked()
      expect(option2).toBeChecked()

      screen.debug()
    })
  })
})
