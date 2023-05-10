import { screen, waitFor } from '@testing-library/react'
import { render } from '../test-utils'
import { VoteCounter } from '../../components/molecules'
import { colors } from '../../styles'

describe('Vote counter molecule', () => {
  it('renders correctly', () => {
    render(<VoteCounter voteCount="0" resourceId="test" />)

    expect(screen.getByTestId('voteCounter')).toBeInTheDocument()
  })
  it('Icons has correct styles', () => {
    render(<VoteCounter voteCount="0" resourceId="test" />)

    const increase = screen.getByTestId('increase')
    const decrease = screen.getByTestId('decrease')

    expect(increase).toBeInTheDocument()
    expect(increase).toHaveStyle(`color: ${colors.gray.gray3}`)

    expect(decrease).toBeInTheDocument()
    expect(decrease).toHaveStyle(`color: ${colors.gray.gray3}`)
  })

  it('Fetches vote', async () => {
    render(<VoteCounter voteCount="0" resourceId="test" />)
    await waitFor(() =>
      expect(screen.getByTestId('voteTest')).toBeInTheDocument()
    )
  })
})
