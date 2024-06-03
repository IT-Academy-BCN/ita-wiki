import { fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { RadioGroup } from '../../components/molecules/RadioGroup'


const mockRadioGroupProps = {
  id: 'testid',
  label: 'testid',
  options: [
    { id: 'test1', name: 'Test1' },
    { id: 'test2', name: 'Test2' },
    { id: 'test3', name: 'Test3' },
  ],
  direction: 'row',
  inputName: 'test_name',
  errorMessage: 'error',
}

describe('RadioGroupText', () => {
  it('renders correctly', () => {
    render(
      <RadioGroup {...mockRadioGroupProps} />
    )

    expect(screen.getByText('testid')).toBeInTheDocument()
    expect(screen.getByText('Test1')).toBeInTheDocument()
    expect(screen.getByText('Test2')).toBeInTheDocument()
    expect(screen.getByText('Test3')).toBeInTheDocument()
  })

  it('renders correctly with error message', () => {
    render(
      <RadioGroup {...mockRadioGroupProps} error />
    )

    expect(screen.getByText('error')).toBeInTheDocument()      
    
  })

})
