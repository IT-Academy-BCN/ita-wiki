import { vi } from 'vitest'
import { TopicsRadioWidget } from '../../components/organisms'
import { fireEvent, render, screen, waitFor } from '../test-utils'
import { mswServer } from '../setup'
import { errorHandlers } from '../../__mocks__/handlers'

describe('TopicsRadioWidget', () => {
  it('renders correctly on succesfull API call', async () => {
    const setTopic = vi.fn()
    render(
      <TopicsRadioWidget slug="react" setTopic={setTopic} />
    )

    const spinnerComponent = screen.getByRole('status') as HTMLDivElement
    expect(spinnerComponent).toBeInTheDocument()

    await waitFor(() => {
      const option1 = screen.getByText('Listas')
      expect(option1).toBeInTheDocument()
    })
  })

  it('renders correctly when there is an error during the fetch', async () => {
    mswServer.use(...errorHandlers)
    const setTopic = vi.fn()
    render(
      <TopicsRadioWidget slug="react" setTopic={setTopic} />
    )

    const spinnerComponent = screen.getByRole('status') as HTMLDivElement
    expect(spinnerComponent).toBeInTheDocument()

    await waitFor(() => {
      const errMsg = screen.getByText('Ha habido un error...')
      expect(errMsg).toBeInTheDocument()
    })
  })

  it('shows "Todos" as the default selected option', async () => {
    const setTopic = vi.fn()
    
    render(
      <TopicsRadioWidget slug="react" setTopic={setTopic} />
    )
  
    await waitFor(() => {
      const option1 = screen.getByLabelText(/tots/i)
      const option2 = screen.getByLabelText(/listas/i)
      expect(option1).toBeChecked()
      expect(option2).not.toBeChecked()
    })
  })

  it('The user can select another radio option', async () => {
    const setTopic = vi.fn()

    render(<TopicsRadioWidget slug="react" setTopic={setTopic} />)

    await waitFor(() => {
      const option1 = screen.getByLabelText(/tots/i)
      const option2 = screen.getByLabelText(/listas/i)
      const option3 = screen.getByLabelText(/renderizado condicional/i)

      expect(option1).toBeChecked()

      fireEvent.click(option3)
      expect(setTopic).toHaveBeenCalledWith('cli04uxud000609k37w9phejw')
      expect(option2).not.toBeChecked()
      expect(option3).toBeChecked()
    })
  })
})
