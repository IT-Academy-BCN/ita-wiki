import { render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { VoteCounter } from '../../components/molecules'
import { colors } from '../../styles'
import { mswServer } from '../setup'
import { voteHandlers } from '../../__mocks__/handlers'

describe('Vote counter molecule', () => {
  it('renders correctly', () => {
    const queryClient = new QueryClient()
    render(
      <QueryClientProvider client={queryClient}>
        <VoteCounter voteCount="0" resourceId="test" />
      </QueryClientProvider>
    )

    expect(screen.getByTestId('voteCounter')).toBeInTheDocument()
  })
  it('Icons has correct styles', () => {
    const queryClient = new QueryClient()

    render(
      <QueryClientProvider client={queryClient}>
        <VoteCounter voteCount="0" resourceId="test" />
      </QueryClientProvider>
    )

    const increase = screen.getByTestId('increase')
    const decrease = screen.getByTestId('decrease')

    expect(increase).toBeInTheDocument()
    expect(increase).toHaveStyle(`color: ${colors.gray.gray3}`)

    expect(decrease).toBeInTheDocument()
    expect(decrease).toHaveStyle(`color: ${colors.gray.gray3}`)
  })

  it('Fetches vote', async () => {
    const queryClient = new QueryClient()
    mswServer.use(...voteHandlers)
    render(
      <QueryClientProvider client={queryClient}>
        <VoteCounter voteCount="0" resourceId="test" />
      </QueryClientProvider>
    )
    await waitFor(() =>
      expect(screen.getByTestId('voteTest')).toBeInTheDocument()
    )
  })
})
