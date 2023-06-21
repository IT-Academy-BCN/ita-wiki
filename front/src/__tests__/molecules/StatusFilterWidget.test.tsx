import { render, screen, waitFor, fireEvent } from '../test-utils'
import { StatusFilterWidget } from '../../components/molecules'

describe('StatusFilterWidget', () => {
  it('renders component correctly', () => {
    render(<StatusFilterWidget />)

    expect(screen.getByText('Estado')).toBeInTheDocument()
    expect(screen.getByLabelText('Por ver')).toBeInTheDocument()
    expect(screen.getByLabelText('Vistos')).toBeInTheDocument()
  })

  it('renders all checkboxes checked by default and user can uncheck them', async () => {
    render(<StatusFilterWidget />)

    const checkBoxA = screen.getByLabelText('Por ver')
    const checkBoxB = screen.getByLabelText('Vistos')

    expect(checkBoxA).toBeChecked()
    expect(checkBoxB).toBeChecked()

    fireEvent.click(checkBoxA)

    await waitFor(() => expect(checkBoxA).not.toBeChecked())

    fireEvent.click(checkBoxB)

    await waitFor(() => expect(checkBoxB).not.toBeChecked())
    screen.debug()
  })
})
