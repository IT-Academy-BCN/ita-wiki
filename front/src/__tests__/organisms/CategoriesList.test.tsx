import userEvent from '@testing-library/user-event'
import { render, screen, waitFor } from '../test-utils'
import { CategoriesList } from '../../components/organisms'
import { mswServer } from '../setup'
import { errorHandlers } from '../../__mocks__/handlers'

describe('CategoriesList', () => {
  it('renders correctly on success', async () => {
    render(<CategoriesList renderDesktopStyle={false} />)

    const spinnerComponent = screen.getByRole('status') as HTMLDivElement

    await waitFor(() => expect(spinnerComponent).toBeInTheDocument())

    await waitFor(() => {
      expect(screen.queryAllByText('React').length).toBeGreaterThan(0)
    })
  })

  it('renders correctly on error', async () => {
    mswServer.use(...errorHandlers)
    render(<CategoriesList renderDesktopStyle={false} />)

    const spinnerComponent = screen.getByRole('status') as HTMLDivElement

    await waitFor(() => expect(spinnerComponent).toBeInTheDocument())

    await waitFor(() => {
      expect(screen.getByText('Ha habido un error...')).toBeInTheDocument()
    })
  })

  it.skip('changes the url path when clicking a category', async () => {
    render(<CategoriesList renderDesktopStyle={false} />)

    const spinnerComponent = screen.getByRole('status') as HTMLDivElement

    await waitFor(() => expect(spinnerComponent).toBeInTheDocument())

    expect(window.location.pathname).toEqual('/')
    const reactMenuOption = screen.getByTestId('React')

    userEvent.click(reactMenuOption)
    await waitFor(() => {
      expect(window.location.pathname).toEqual('/category/react')
    })
  })
})
