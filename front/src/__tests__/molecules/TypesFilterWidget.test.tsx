import { vi } from 'vitest'
import { render, screen, waitFor, fireEvent } from '../test-utils'
import { TypesFilterWidget } from '../../components/molecules/TypesFilterWidget'
import { mswServer } from '../setup'
import { errorHandlers } from '../../__mocks__/handlers'
import { useGetTypes } from '../../hooks'
import { FiltersProvider } from '../../context/store/context'
import { ActionTypes } from '../../context/store/types'

describe('TypesFilterWidget', () => {
  const onChangeTypesFilter = vi.fn()
  afterEach(() => {
    vi.restoreAllMocks()
  })

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

    expect(onChangeTypesFilter).toHaveBeenCalledWith({
      type: ActionTypes.SetTypes,
      payload: { types: ['Test type 1', 'Test type 2', 'Test type 3'] },
    })
  })

  // it('Should raise an onChange event when user clicks one checkbox', async () => {
  //   render(
  //     <FiltersProvider>
  //       <TypesFilterWidget />
  //     </FiltersProvider>
  //   )
  //   const spinnerComponent = screen.getByRole('status') as HTMLDivElement

  //   await waitFor(() => expect(spinnerComponent).toBeInTheDocument())
  //   await waitFor(() => expect(spinnerComponent).not.toBeInTheDocument())

  //   const checkBoxA = screen.getByLabelText('Test type 1')
  //   expect(checkBoxA).toBeChecked()
  //   fireEvent.click(checkBoxA)

  //   expect(onChangeTypesFilter).toHaveBeenCalled()
  //   await waitFor(() =>
  //     expect(onChangeTypesFilter).toHaveBeenCalledWith({
  //       type: ActionTypes.SetTypes,
  //       payload: { types: ['Test type 2', 'Test type 3'] },
  //     })
  //   )
  // })

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

  // it('should raise an onChange event when user clicks one checkbox', async () => {
  //   render(<TypesFilterWidget />)

  //   const spinnerComponent = screen.getByRole('status') as HTMLDivElement

  //   await waitFor(() => expect(spinnerComponent).toBeInTheDocument())

  //   await waitFor(() => expect(spinnerComponent).not.toBeInTheDocument())

  //   const checkBoxA = screen.getByLabelText('Test type 1')

  //   expect(checkBoxA).toBeChecked()

  //   fireEvent.click(checkBoxA)

  //   await waitFor(() =>
  //     expect(onChangeTypesFilter).toHaveBeenCalledWith([
  //       'Test type 2',
  //       'Test type 3',
  //     ])
  //   )

  //   fireEvent.click(checkBoxA)
  //   await waitFor(() =>
  //     expect(onChangeTypesFilter).toHaveBeenCalledWith([
  //       'Test type 1',
  //       'Test type 2',
  //       'Test type 3',
  //     ])
  //   )
  //   expect(onChangeTypesFilter).toHaveBeenCalledTimes(3)
  // })

  // it('renders correctly on error', async () => {
  //   mswServer.use(...errorHandlers)
  //   render(<TypesFilterWidget />)

  //   const spinnerComponent = screen.getByRole('status') as HTMLDivElement

  //   await waitFor(() => expect(spinnerComponent).toBeInTheDocument())

  //   await waitFor(() => {
  //     expect(screen.getByText('Ha habido un error...')).toBeInTheDocument()
  //   })
  // })
})
