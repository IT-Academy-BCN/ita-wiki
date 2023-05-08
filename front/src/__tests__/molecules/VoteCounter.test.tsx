import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { rest } from 'msw'
import { VoteCounter } from '../../components/molecules'
import { server } from '../../__mocks__/server'
import { colors } from '../../styles'

describe('Vote counter molecule', () => {
  it('renders correctly', () => {
    render(<VoteCounter vote={0} resourceId="test" />)

    expect(screen.getByTestId('voteCounter')).toBeInTheDocument()
  })
  it('Icons has correct styles', () => {
    render(<VoteCounter vote={0} resourceId="test" />)

    const increase = screen.getByTestId('increase')
    const decrease = screen.getByTestId('decrease')

    expect(increase).toBeInTheDocument()
    expect(increase).toHaveStyle(`color: ${colors.gray.gray3}`)

    expect(decrease).toBeInTheDocument()
    expect(decrease).toHaveStyle(`color: ${colors.gray.gray3}`)
  })
  it('Increases vote when clicks increase', async () => {
    render(<VoteCounter vote={0} resourceId="test" />)
    const increase = screen.getByTestId('increase')

    expect(screen.getByTestId('voteTest')).toHaveTextContent('0')

    fireEvent.click(increase)
    await waitFor(() => {
      expect(screen.getByTestId('voteTest')).toHaveTextContent('1')
    })
  })
})
