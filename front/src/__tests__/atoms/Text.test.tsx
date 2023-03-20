import { render, screen } from '@testing-library/react'
import { Text } from '../../components/atoms'

describe('Text', () => {
  it('should render the text', () => {
    render(<Text>test</Text>)
    expect(screen.getByText('test')).toBeInTheDocument()
  })
})
