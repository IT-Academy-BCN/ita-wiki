import { vi } from 'vitest'
import { render, screen, waitFor, fireEvent } from '../test-utils'
import { TypesFilterWidget } from '../../components/molecules'
import { errorHandlers } from '../../__mocks__/handlers'
import { server } from '../../__mocks__/server'

describe('TypesFilterWidget', () => {
  const onChangeTypesFilter = vi.fn()
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders component correctly with all filters selected', async () => {
    render(<TypesFilterWidget handleTypesFilter={onChangeTypesFilter} />)

    expect(screen.getByText(/format/i)).toBeInTheDocument()

    const spinnerComponent = screen.getByRole('status') as HTMLDivElement

    await waitFor(() => expect(spinnerComponent).toBeInTheDocument())

    await waitFor(() => {
      expect(screen.getByLabelText('Test type 1')).toBeInTheDocument()
      expect(screen.getByLabelText('Test type 2')).toBeInTheDocument()
      expect(screen.getByLabelText('Test type 3')).toBeInTheDocument()
    })

    expect(onChangeTypesFilter).toHaveBeenCalledTimes(3)
    expect(onChangeTypesFilter).toHaveBeenCalledWith([
      'Test type 1',
      'Test type 2',
      'Test type 3',
    ])
  })

  it('clicking a checkbox removes/adds its value from/to the filter selection', async () => {
    render(<TypesFilterWidget handleTypesFilter={onChangeTypesFilter} />)

    const spinnerComponent = screen.getByRole('status') as HTMLDivElement

    await waitFor(() => expect(spinnerComponent).toBeInTheDocument())

    await waitFor(() => {
      expect(screen.getByLabelText('Test type 1')).toBeInTheDocument()
      expect(screen.getByLabelText('Test type 2')).toBeInTheDocument()
      expect(screen.getByLabelText('Test type 3')).toBeInTheDocument()
    })

    const checkBoxA = screen.getByLabelText('Test type 1')

    expect(checkBoxA).toBeChecked()
    expect(screen.getByLabelText('Test type 2')).toBeChecked()
    expect(screen.getByLabelText('Test type 3')).toBeChecked()

    fireEvent.click(checkBoxA)

    await waitFor(() => expect(checkBoxA).not.toBeChecked())
    await waitFor(() =>
      expect(onChangeTypesFilter).toHaveBeenCalledWith([
        'Test type 2',
        'Test type 3',
      ])
    )

    fireEvent.click(checkBoxA)

    await waitFor(() =>
      expect(onChangeTypesFilter).toHaveBeenCalledWith([
        'Test type 1',
        'Test type 2',
        'Test type 3',
      ])
    )

    expect(onChangeTypesFilter).toHaveBeenCalledTimes(5)
  })

  it('renders correctly on error', async () => {
    server.use(...errorHandlers)
    render(<TypesFilterWidget handleTypesFilter={onChangeTypesFilter} />)

    const spinnerComponent = screen.getByRole('status') as HTMLDivElement

    await waitFor(() => expect(spinnerComponent).toBeInTheDocument())

    await waitFor(() => {
      expect(screen.getByText('Hi ha hagut un error...')).toBeInTheDocument()
    })
  })
})
