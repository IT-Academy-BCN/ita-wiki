import { render, screen } from '@testing-library/react'
import { Counter } from '../../components/atoms'

describe('Counter', () => {
  it('renders correctly with given props', () => {
    render(
      <Counter
        number={37}
        text="Comments"
        icon="test"
        isError={false}
        errorMessage="n/a"
      />
    )

    const number = screen.getByText(37)
    expect(number).toBeInTheDocument()
    const text = screen.getByText(/comments/i)
    expect(text).toBeInTheDocument()
    const icon = screen.getByText(/test/i)
    expect(icon).toBeInTheDocument()
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })

  it('renders correctly when number is 0', () => {
    render(
      <Counter
        number={0}
        text="Comments"
        icon="test"
        isError={false}
        errorMessage="n/a"
      />
    )

    const number = screen.getByText(0)
    expect(number).toBeInTheDocument()
    const text = screen.getByText(/comments/i)
    expect(text).toBeInTheDocument()
    const icon = screen.getByText(/test/i)
    expect(icon).toBeInTheDocument()
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })

  it('renders spinner if there is no number', () => {
    render(
      <Counter
        number={undefined}
        text="Comments"
        icon="test"
        isError={false}
        errorMessage="n/a"
      />
    )

    expect(screen.getByRole('status')).toBeInTheDocument()
    const text = screen.getByText(/comments/i)
    expect(text).toBeInTheDocument()
    const icon = screen.getByText(/test/i)
    expect(icon).toBeInTheDocument()
  })

  it('renders not available text if there is an error with data', () => {
    render(
      <Counter
        number={undefined}
        text="Comments"
        icon="test"
        isError
        errorMessage="n/a"
      />
    )

    expect(screen.getByText('n/a')).toBeInTheDocument()
    const text = screen.getByText(/comments/i)
    expect(text).toBeInTheDocument()
    const icon = screen.getByText(/test/i)
    expect(icon).toBeInTheDocument()
  })
})
