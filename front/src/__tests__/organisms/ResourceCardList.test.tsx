import { render, screen, waitFor } from '../test-utils'
import { Params } from 'react-router-dom'
import { ResourceCardList } from '../../components/organisms'
import { mswServer } from '../setup'
import { vi } from 'vitest'
import { errorHandlers } from '../../__mocks__/handlers'
import { BrowserRouter, MemoryRouter, Route } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './../setup'

// vi.mock('react-router-dom', () => ({
//   useParams: (): Readonly<Params<string>> => ({ slug: 'react' }),
// }))

// vi.mock("react-router-dom", async () => {
//   const actual = await vi.importActual("react-router-dom")
//   return {
//     ...actual,
//     // your mocked methods
//   },
// })

// vi.mock('react-router-dom', async () => {
//   const actual = await vi.importActual('react-router-dom') // use actual for all non-hook parts

//   return {
//     ...actual,
//     useParams: () => ({
//       slug: 'react',
//     }),
//   }
// })

describe('ResourceCardList', () => {
  it('renders ResourceCard correctly on success', async () => {
    render(<ResourceCardList />)
    // render(
    //   <QueryClientProvider client={queryClient}>
    //     <MemoryRouter initialEntries={['resources?category=node']}>
    //       <Route path="resources?category=">
    //         <ResourceCardList />
    //       </Route>
    //     </MemoryRouter>
    //   </QueryClientProvider>
    // )

    const spinnerComponent = screen.getByRole('status') as HTMLDivElement

    await waitFor(() => expect(spinnerComponent).toBeInTheDocument())

    await waitFor(() => {
      expect(screen.getByText('Resource Test')).toBeInTheDocument()
      expect(screen.queryByTestId('emptyResource')).not.toBeInTheDocument()
    })
  })
  it('renders message when Category does not have Resources', async () => {
    render(<ResourceCardList />)

    const spinnerComponent = screen.getByRole('status') as HTMLDivElement

    await waitFor(() => expect(spinnerComponent).toBeInTheDocument())

    await waitFor(() => {
      expect(screen.getByTestId('emptyResource')).toBeInTheDocument()
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
