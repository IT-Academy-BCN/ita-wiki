import { render, screen } from '@testing-library/react'
import { Spinner } from '../../components/atoms/index'


describe('Spinner', () => {
  it('should render correctly', () => {
    render(<Spinner />)

    const spinner = screen.getAllByText('test')
    expect(spinner).toBeInTheDocument()
  })
})
