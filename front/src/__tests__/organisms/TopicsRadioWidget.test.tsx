import { TopicsRadioWidget } from '../../components/organisms'
import { render, screen, waitFor } from '../test-utils'

describe('TopicsRadioWidget', () => {
  it('renders correctly on succesfull API call', async () => {
    render(<TopicsRadioWidget slug="react" />)

    const spinnerComponent = screen.getByRole('status') as HTMLDivElement
    expect(spinnerComponent).toBeInTheDocument()

    // const option1 = screen.findByLabelText('Listas')
    // expect(option1).toBeInTheDocument()
    await waitFor(() => screen.debug())
  })
})
