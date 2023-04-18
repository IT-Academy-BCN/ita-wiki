import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { expect } from 'vitest'
import { CheckBox } from '../../components/atoms'
import { colors } from '../../styles'


describe('CheckBox', () => {
  it('renders correctly', async () => {
    render(
      <CheckBox
        id="idTest"
        label="Test label"
      />
    )

    const checkBoxTest = screen.getByLabelText('Test label')
    const labelTest = screen.getByText('Test label')

    expect(checkBoxTest).toBeInTheDocument()
    expect(labelTest).toBeInTheDocument()

    expect(checkBoxTest).toHaveAttribute("type", "checkbox")
    expect(checkBoxTest).toHaveStyle(`color: ${colors.gray.gray2};`)

    expect(checkBoxTest).not.toBeChecked() 

    fireEvent.click(checkBoxTest)

      await waitFor(() => 
        expect(checkBoxTest).toBeChecked() 
      )
  })
  
  it('renders label that checks its checkbox when is clicked', async () => {
    render(
      <CheckBox
        id="idTest"
        label="Test label"
      />
    )

    const checkBoxTest = screen.getByLabelText('Test label')
    const labelTest = screen.getByText('Test label')
    
    expect(checkBoxTest).not.toBeChecked() 

    fireEvent.click(labelTest)

      await waitFor(() => 
        expect(checkBoxTest).toBeChecked() 
      )
  })

  it('renders checkbox checked by default when provided and user can uncheck it', async () => {
    render(
      <CheckBox
        id="idTest"
        label="Test label"
        defaultChecked
      />
    )

    const checkBoxTest = screen.getByLabelText('Test label')

    expect(checkBoxTest).toBeChecked() 

    fireEvent.click(checkBoxTest)

      await waitFor(() => 
        expect(checkBoxTest).not.toBeChecked() 
      )
  })
  

  it('renders correctly with particular legal style', () => {
    render(
      <CheckBox
        legal
        id="idTest"
        label="Test label"
      />
    )

    const checkBoxTest = screen.getByLabelText('Test label')

    expect(checkBoxTest).toHaveStyle(`color: ${colors.black.black1};`)

  })
})
