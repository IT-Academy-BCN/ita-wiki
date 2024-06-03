import { render, screen } from '@testing-library/react'
import { RadioGroup } from '../../components/molecules'

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
      <RadioGroup {...mockRadioGroupProps} direction={'row'} />
    )
    expect(screen.getByText('testid')).toBeInTheDocument()
  })

  it('displays all options', () => {
    render(
      <RadioGroup {...mockRadioGroupProps} direction={'row'} />
    );
    mockRadioGroupProps.options.forEach(option => {
      expect(screen.getByLabelText(option.name)).toBeInTheDocument();
    });
  });

  it('renders correctly with error message', () => {
    render(
      <RadioGroup {...mockRadioGroupProps} direction={'row'} error />
    )
    expect(screen.getByText('error')).toBeInTheDocument()    
  })
})