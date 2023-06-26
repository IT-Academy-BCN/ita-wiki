import { vi } from 'vitest'
import { render, screen, waitFor, fireEvent } from '../test-utils'
import { TypesFilterWidget } from '../../components/molecules/TypesFilterWidget'
import { mswServer } from '../setup'
import { errorHandlers } from '../../__mocks__/handlers'

describe('TypesFilterWidget', () => {
  const onChangeTypesFilter = vi.fn()
  afterEach(() => {
    vi.restoreAllMocks()
  })
  it('renders component correctly with all filters selected', async () => {
    render(<TypesFilterWidget handleTypesFilter={onChangeTypesFilter} />)

    const spinnerComponent = screen.getByRole('status') as HTMLDivElement

    await waitFor(() => expect(spinnerComponent).toBeInTheDocument())

    await waitFor(() => {
      expect(screen.getByText('Tipo')).toBeInTheDocument()
      expect(screen.getByLabelText('Test type 1')).toBeInTheDocument()
      expect(screen.getByLabelText('Test type 2')).toBeInTheDocument()
      expect(screen.getByLabelText('Test type 3')).toBeInTheDocument()
    })

    expect(onChangeTypesFilter).toHaveBeenCalledTimes(2)
    expect(onChangeTypesFilter).toHaveBeenCalledWith([
      'Test type 1',
      'Test type 2',
      'Test type 3',
    ])
  })

  it('should raise an onChange event when user clicks one checkbox', async () => {
    render(<TypesFilterWidget handleTypesFilter={onChangeTypesFilter} />)

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

    await waitFor(() =>
      expect(onChangeTypesFilter).toHaveBeenCalledWith([
        'Test type 2',
        'Test type 3',
      ])
    )

    fireEvent.click(checkBoxB)

    await waitFor(() =>
      expect(onChangeTypesFilter).toHaveBeenCalledWith(['Test type 3'])
    )

    fireEvent.click(checkBoxC)

    await waitFor(() => expect(onChangeTypesFilter).toHaveBeenCalledWith([]))

    fireEvent.click(checkBoxA)

    await waitFor(() =>
      expect(onChangeTypesFilter).toHaveBeenCalledWith(['Test type 1'])
    )
    fireEvent.click(checkBoxB)

    await waitFor(() =>
      expect(onChangeTypesFilter).toHaveBeenCalledWith([
        'Test type 1',
        'Test type 2',
      ])
    )

    fireEvent.click(checkBoxC)

    await waitFor(() =>
      expect(onChangeTypesFilter).toHaveBeenCalledWith([
        'Test type 1',
        'Test type 2',
        'Test type 3',
      ])
    )
    expect(onChangeTypesFilter).toHaveBeenCalledTimes(8)
  })

  it('renders correctly on error', async () => {
    mswServer.use(...errorHandlers)
    render(<TypesFilterWidget handleTypesFilter={onChangeTypesFilter} />)

    const spinnerComponent = screen.getByRole('status') as HTMLDivElement

    await waitFor(() => expect(spinnerComponent).toBeInTheDocument())

    await waitFor(() => {
      expect(screen.getByText('Ha habido un error...')).toBeInTheDocument()
    })
  })
})
