import { vi } from 'vitest'
import { UseMutationResult, useMutation } from '@tanstack/react-query'
import { VoteCounter } from '../../components/molecules'
import { fireEvent, screen, waitFor, render } from '../test-utils'

vi.mock('@tanstack/react-query', async () => {
  const actual = await vi.importActual('@tanstack/react-query')
  return {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ...actual,
    useMutation: vi.fn(),
  }
})

describe('Vote counter molecule', () => {
  const mockMutation = vi.fn()

  beforeEach(() =>
    vi.mocked(useMutation).mockReturnValue({
      mutate: mockMutation,
    } as unknown as UseMutationResult<unknown, unknown, unknown, unknown>)
  )

  it('renders correctly', () => {
    render(<VoteCounter voteCount="0" resourceId="test" />)
    expect(screen.getByTestId('increase')).toBeInTheDocument()
    expect(screen.getByTestId('decrease')).toBeInTheDocument()
    expect(screen.getByTestId('voteCounter')).toBeInTheDocument()
    expect(screen.getByText('0')).toBeInTheDocument()
  })

  it('makes the correct request', async () => {
    render(<VoteCounter voteCount="0" resourceId="test" />)

    const increase = screen.getByTestId('increase')
    const decrease = screen.getByTestId('decrease')

    expect(increase).toBeInTheDocument()
    expect(decrease).toBeInTheDocument()

    fireEvent.click(increase)
    await waitFor(() => {
      expect(mockMutation).toHaveBeenCalledWith('1')
    })

    fireEvent.click(decrease)
    await waitFor(() => {
      expect(mockMutation).toHaveBeenCalledWith('-1')
    })
  })
})
