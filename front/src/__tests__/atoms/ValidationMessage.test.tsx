import { render, screen } from '@testing-library/react'
import { ValidationMessage } from '../../components/atoms/ValidationMessage'

describe('ValidationMessage', () => {
  it('should render the message', () => {
    render(
      <ValidationMessage color="success" fontSize="12px">
        test
      </ValidationMessage>
    )
    const validationMessage = screen.getAllByText('test')
    expect(validationMessage).toBeInTheDocument()
    expect(validationMessage).toHaveStyle({
      color: 'success',
    })
    expect(validationMessage).toHaveStyle({
      'font-size': '12px',
    })
  })
})
