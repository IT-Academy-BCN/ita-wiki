import { render, screen } from '@testing-library/react'
import { VoteCounter } from '../../components/molecules'
import { colors } from '../../styles'

describe('Vote counter molecule', () => {
  it('renders correctly', () => {
    render(<VoteCounter vote={0} />)

    expect(screen.getByTestId('voteCounter')).toBeInTheDocument()
  })
  it('Icons has correct styles', () => {
    render(<VoteCounter vote={0} />)

    const increase = screen.getByTestId('increase')
    const decrease = screen.getByTestId('decrease')

    expect(increase).toBeInTheDocument()
    expect(increase).toHaveStyle(`color: ${colors.gray.gray3}`)

    expect(decrease).toBeInTheDocument()
    expect(decrease).toHaveStyle(`color: ${colors.gray.gray3}`)
  })
})
