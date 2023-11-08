import { render, screen, waitFor, fireEvent } from '../test-utils'
import { TypesFilterWidget } from '../../components/molecules/TypesFilterWidget'
import { mswServer } from '../setup'
import { errorHandlers } from '../../__mocks__/handlers'
import { FiltersProvider } from '../../context/store/context'

describe('TypesFilterWidget', () => {
  it('renders component correctly with all filters selected', async () => {
    render(
      <FiltersProvider>
        <TypesFilterWidget />
      </FiltersProvider>
    )

    const spinnerComponent = screen.getByRole('status') as HTMLDivElement

    await waitFor(() => expect(spinnerComponent).toBeInTheDocument())

    await waitFor(() => {
      expect(screen.getByText('Tipo')).toBeInTheDocument()
      expect(screen.getByLabelText('Test type 1')).toBeInTheDocument()
      expect(screen.getByLabelText('Test type 2')).toBeInTheDocument()
      expect(screen.getByLabelText('Test type 3')).toBeInTheDocument()
    })
  })

  it('Should raise an onChange event when user clicks one checkbox', async () => {
    render(
      <FiltersProvider>
        <TypesFilterWidget />
      </FiltersProvider>
    )
    const spinnerComponent = screen.getByRole('status') as HTMLDivElement

    await waitFor(() => expect(spinnerComponent).toBeInTheDocument())
    await waitFor(() => expect(spinnerComponent).not.toBeInTheDocument())

    const checkBoxA = screen.getByLabelText('Test type 1')
    expect(checkBoxA).toBeChecked()
    fireEvent.click(checkBoxA)

    await waitFor(() => expect(checkBoxA).not.toBeChecked())
  })

  it('renders correctly on error', async () => {
    mswServer.use(...errorHandlers)
    render(
      <FiltersProvider>
        <TypesFilterWidget />
      </FiltersProvider>
    )

    const spinnerComponent = screen.getByRole('status') as HTMLDivElement

    await waitFor(() => expect(spinnerComponent).toBeInTheDocument())

    await waitFor(() => {
      expect(screen.getByText('Ha habido un error...')).toBeInTheDocument()
    })
  })
})
