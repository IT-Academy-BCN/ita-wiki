import { render, screen } from '@testing-library/react'
import { TextareaGroup } from '../../components/molecules'

describe('TextareaGroup', () => {
  it('renders correctlyl', () => {
    render(
      <TextareaGroup
        label="label"
        name="test-name"
        id="test-id"
        placeholder="text here"
        rows={5}
      />
    )
    const label = screen.getByText('label')
    const textarea = screen.getByTestId('textarea')

    expect(label).toBeInTheDocument()
    expect(textarea).toBeInTheDocument()
    expect(label).toHaveAttribute('for', 'test-id')
    expect(textarea).toHaveAttribute('id', 'test-id')
    expect(textarea).toHaveAttribute('rows', '5')
    expect(textarea).toHaveAttribute('name', 'test-name')
  })
})
