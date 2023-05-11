import { fireEvent, screen, waitFor } from '@testing-library/react'
import { render } from '../test-utils'
import { VoteCounter } from '../../components/molecules'
import { colors } from '../../styles'
import { mswServer } from '../setup'
import { errorHandlers } from '../../__mocks__/handlers'

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

  it('Changes voteCount', async () => {
    render(<VoteCounter voteCount="0" resourceId="test" />)
    fireEvent.click(screen.getByTestId('increase'))
    await waitFor(() => {
      expect(screen.getByTestId('voteTest')).toHaveTextContent('1')
    })
  })
  it('Renders errors', async () => {
    mswServer.use(...errorHandlers)
    render(<VoteCounter voteCount="0" resourceId="test" />)
    // await waitFor(() => {
    //   expect(screen.getByTestId('voteError')).toBeInTheDocument()
    // })
  })
})
