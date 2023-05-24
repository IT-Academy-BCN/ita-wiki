import { TopicsRadioWidget } from '../../components/organisms'
import { render, screen, waitFor } from '../test-utils'

describe('TopicsRadioWidget', () => {
  it('renders correctly on succesfull API call', async () => {
    render(<TopicsRadioWidget slug="react" />)

    const spinnerComponent = screen.getByRole('status') as HTMLDivElement

    await waitFor(() => expect(spinnerComponent).toBeInTheDocument())
  })
})
