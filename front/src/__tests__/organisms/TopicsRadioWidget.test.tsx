import { vi } from 'vitest'
import { rest } from 'msw'
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
      const option1 = screen.getByText(/listas/i)
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
      const errMsg = screen.getByText(/ha habido un error.../i)
      expect(errMsg).toBeInTheDocument()
    })
  })

  it('renders correctly with empty data', async () => {
    mswServer.use(
      rest.get('/api/v1/resources', (req, res, ctx) => res(ctx.json([])))
    )
    const setTopic = vi.fn()

    render(<TopicsRadioWidget slug="react" setTopic={setTopic} />)

    const spinnerComponent = screen.getByRole('status') as HTMLDivElement
    expect(spinnerComponent).toBeInTheDocument()

    await waitFor(() => {
      const defaultOption = screen.getByText(/tots/i)
      expect(defaultOption).toBeInTheDocument()

      const additionalOptions = screen.queryAllByRole('radio')
      expect(additionalOptions).toHaveLength(3)
    })
  })

  it('displays "Todos" as the default option and allows users to select others', async () => {
    const setTopic = vi.fn()
    
    render(
      <TopicsRadioWidget slug="react" setTopic={setTopic} />
    )
  
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
})
