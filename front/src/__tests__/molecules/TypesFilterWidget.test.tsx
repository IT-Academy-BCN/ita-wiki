import { vi } from 'vitest'
import { render, screen, waitFor, fireEvent } from '../test-utils'
import userEvent from '@testing-library/user-event'
import { TypesFilterWidget } from '../../components/molecules/TypesFilterWidget'
import { mswServer } from '../setup'
import { errorHandlers } from '../../__mocks__/handlers'

const setSelectedTypes = vi.fn()
const handleChange = vi.fn()
const onChangeCheckbox = vi.fn()

describe('TypesFilterWidget', () => {
  it('renders TypesFilterWidget correctly on success', async () => {
    render(
      <TypesFilterWidget
        selectedTypes={[]}
        setSelectedTypes={setSelectedTypes}
      />
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

  it.only('should raise an onChange event when user clicks one checkbox', async () => {
    render(
      <TypesFilterWidget
        selectedTypes={[]}
        setSelectedTypes={setSelectedTypes}
      />
    )

    const spinnerComponent = screen.getByRole('status') as HTMLDivElement

    await waitFor(() => expect(spinnerComponent).toBeInTheDocument())

    await waitFor(() => expect(spinnerComponent).not.toBeInTheDocument())

    const checkBoxA = screen.getByLabelText('Test type 1')
    const checkBoxB = screen.getByLabelText('Test type 2')
    // const checkBoxC = screen.getByLabelText('Test type 3')

    expect(checkBoxA).toBeChecked()
    // expect(checkBoxB).toBeChecked()
    // expect(checkBoxC).toBeChecked()

    // fireEvent.click(checkBoxA)

    // await waitFor(
    //   () => expect(handleChange).toHaveBeenCalledTimes(1)
    //   //      expect(handleChange).toHaveBeenCalledWith('Test type 1')
    // )
    screen.debug()
    userEvent.click(checkBoxB)

    await waitFor(() => expect(handleChange).toHaveBeenCalled())
    //await waitFor(() => expect(checkBoxB).not.toBeChecked())
    //expect(onChangeCheckbox).toHaveBeenCalled()
    // fireEvent.click(checkBoxC)
    // await waitFor(() => expect(checkBoxC).not.toBeChecked())
  })

  it('renders correctly on error', async () => {
    mswServer.use(...errorHandlers)
    render(
      <TypesFilterWidget
        selectedTypes={[]}
        setSelectedTypes={setSelectedTypes}
      />
    )

    const spinnerComponent = screen.getByRole('status') as HTMLDivElement

    await waitFor(() => expect(spinnerComponent).toBeInTheDocument())

    await waitFor(() => {
      expect(screen.getByText('Ha habido un error...')).toBeInTheDocument()
    })
  })
})
