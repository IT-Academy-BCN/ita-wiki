import { render, screen } from '@testing-library/react'
import { Counter } from '../../components/atoms'

describe('Counter', () => {
  it('renders correctly with given props', () => {
    render(
      <Counter
        number={ 37 }
        text='Comments'
      />
    )
      const number: HTMLParagraphElement = screen.getByText(37)
      expect(number).toBeInTheDocument()
      const text: HTMLParagraphElement = screen.getByText(/comments/i)
      expect(text).toBeInTheDocument()
  })
})