import { Route, Routes } from 'react-router-dom'
import { render, screen, waitFor } from '../test-utils'
import { ResourceCardList } from '../../components/organisms'
import { mswServer } from '../setup'
import { errorHandlers } from '../../__mocks__/handlers'

describe('ResourceCardList', () => {
  it('renders ResourceCard correctly on success', async () => {
    render(
      <Routes>
        <Route path="/category/:slug" element={<ResourceCardList />} />
      </Routes>,
      {
        initialEntries: ['/category/resourceTest'],
      }
    )

    const spinnerComponent = screen.getByRole('status') as HTMLDivElement

    await waitFor(() => expect(spinnerComponent).toBeInTheDocument())

    await waitFor(() => {
      expect(screen.getByText('Resource Test')).toBeInTheDocument()
      expect(screen.getByRole('link')).toHaveAttribute(
        'href',
        'http://www.google.com'
      )
      expect(screen.queryByTestId('emptyResource')).not.toBeInTheDocument()
    })
  })

  it('renders message when Category does not have Resources', async () => {
    render(
      <Routes>
        <Route path="/category/:slug" element={<ResourceCardList />} />
      </Routes>,
      {
        initialEntries: ['/category/emptyResource'],
      }
    )

    const spinnerComponent = screen.getByRole('status') as HTMLDivElement

    await waitFor(() => expect(spinnerComponent).toBeInTheDocument())

    await waitFor(() => {
      expect(screen.getByTestId('emptyResource')).toBeInTheDocument()
      expect(screen.queryByText('Resource Test')).not.toBeInTheDocument()
    })
  })

  it('renders correctly on error', async () => {
    mswServer.use(...errorHandlers)
    render(<ResourceCardList />)

    const spinnerComponent = screen.getByRole('status') as HTMLDivElement

    await waitFor(() => expect(spinnerComponent).toBeInTheDocument())

    await waitFor(() => {
      expect(screen.getByText('Ha habido un error...')).toBeInTheDocument()
    })
  })
})
