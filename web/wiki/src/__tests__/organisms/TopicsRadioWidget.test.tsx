import { vi } from 'vitest'
import { TopicsRadioWidget } from '../../components/organisms'
import { fireEvent, render, screen, waitFor } from '../test-utils'
import { errorHandlers } from '../../__mocks__/handlers'
import { server } from '../../__mocks__/server'

describe('TopicsRadioWidget', () => {
  it('renders correctly on succesfull API call', async () => {
    const setTopic = vi.fn()
    render(<TopicsRadioWidget slug="react" setTopic={setTopic} />)

    const spinnerComponent = screen.getByRole('status') as HTMLDivElement
    expect(spinnerComponent).toBeInTheDocument()

    await waitFor(() => {
      const option1 = screen.getByText(/listas/i)
      expect(option1).toBeInTheDocument()
    })
  })

  it('renders correctly when there is an error during the fetch', async () => {
    server.use(...errorHandlers)
    const setTopic = vi.fn()
    render(<TopicsRadioWidget slug="react" setTopic={setTopic} />)

    const spinnerComponent = screen.getByRole('status') as HTMLDivElement
    expect(spinnerComponent).toBeInTheDocument()

    await waitFor(() => {
      const errMsg = screen.getByText(/ha habido un error.../i)
      expect(errMsg).toBeInTheDocument()
    })
  })

  it('displays Todos as the default option and allows users to select others', async () => {
    const setTopic = vi.fn()

    render(<TopicsRadioWidget slug="react" setTopic={setTopic} />)

    await waitFor(() => {
      const defaultOption = screen.getByLabelText(/tots/i)
      const option2 = screen.getByLabelText(/listas/i)
      const option3 = screen.getByLabelText(/renderizado condicional/i)

      expect(defaultOption).toBeChecked()
      expect(option2).not.toBeChecked()
      expect(option3).not.toBeChecked()

      fireEvent.click(option3)
      expect(setTopic).toHaveBeenCalledWith('cli04uxud000609k37w9phejw')
      expect(defaultOption).not.toBeChecked()
      expect(option2).not.toBeChecked()
      expect(option3).toBeChecked()
    })
  })

  it('keeps Todos as the selected option after changing the page', async () => {
    const setTopic = vi.fn()

    render(<TopicsRadioWidget slug="react" setTopic={setTopic} />)

    await waitFor(() => {
      const defaultOption = screen.getByLabelText(/tots/i)
      const option2 = screen.getByLabelText(/listas/i)
      const option3 = screen.getByLabelText(/renderizado condicional/i)

      fireEvent.click(option3)

      expect(defaultOption).not.toBeChecked()
      expect(option2).not.toBeChecked()
      expect(option3).toBeChecked()
    })

    render(<TopicsRadioWidget slug="node" setTopic={setTopic} />)

    await waitFor(() => {})

    const updatedDefaultOption = screen.getByLabelText(
      /tots/i
    ) as HTMLInputElement

    expect(updatedDefaultOption).toHaveAttribute('checked')
  })
})
