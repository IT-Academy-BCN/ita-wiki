import { render, screen } from '@testing-library/react'
import { Text } from '../../components/atoms'

describe('Text', () => {
  it('should render the text', () => {
    render(
      <Text color="red" fontSize="50px">
        test
      </Text>
    )
    expect(screen.getByText('test')).toBeInTheDocument()
    expect(screen.getByText('test')).toHaveStyle({ color: 'red' })
    expect(screen.getByText('test')).toHaveStyle({ 'font-size': '50px' })
  })
})
