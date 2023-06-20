import { render, screen, waitFor, fireEvent } from '../test-utils'
import { TypesFilterWidget } from '../../components/molecules/TypesFilterWidget'
import { mswServer } from '../setup'
import { errorHandlers } from '../../__mocks__/handlers'

describe('TypesFilterWidget', () => {
  it('renders TypesFilterWidget correctly on success', async () => {
    render(<TypesFilterWidget />)

    const spinnerComponent = screen.getByRole('status') as HTMLDivElement

    await waitFor(() => expect(spinnerComponent).toBeInTheDocument())

    await waitFor(() => {
      expect(screen.getByText('Tipo')).toBeInTheDocument()
      expect(screen.getByLabelText('Test type 1')).toBeInTheDocument()
      expect(screen.getByLabelText('Test type 2')).toBeInTheDocument()
      expect(screen.getByLabelText('Test type 3')).toBeInTheDocument()
    })
  })

  it('renders all checkboxes checked by default and user can uncheck them', async () => {
    render(<TypesFilterWidget />)

    const spinnerComponent = screen.getByRole('status') as HTMLDivElement

    await waitFor(() => expect(spinnerComponent).toBeInTheDocument())

    await waitFor(() => expect(spinnerComponent).not.toBeInTheDocument())

    const checkBoxA = screen.getByLabelText('Test type 1')
    const checkBoxB = screen.getByLabelText('Test type 2')
    const checkBoxC = screen.getByLabelText('Test type 3')

    expect(checkBoxA).toBeChecked()
    expect(checkBoxB).toBeChecked()
    expect(checkBoxC).toBeChecked()

    fireEvent.click(checkBoxA)

    await waitFor(() => expect(checkBoxA).not.toBeChecked())

    fireEvent.click(checkBoxB)

    await waitFor(() => expect(checkBoxB).not.toBeChecked())

    fireEvent.click(checkBoxC)

    await waitFor(() => expect(checkBoxC).not.toBeChecked())
  })

  it('renders correctly on error', async () => {
    mswServer.use(...errorHandlers)
    render(<TypesFilterWidget />)

    const spinnerComponent = screen.getByRole('status') as HTMLDivElement

    await waitFor(() => expect(spinnerComponent).toBeInTheDocument())

    await waitFor(() => {
      expect(screen.getByText('Ha habido un error...')).toBeInTheDocument()
    })
  })
})
