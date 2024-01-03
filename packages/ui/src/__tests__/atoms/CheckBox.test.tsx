import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { expect, it, describe } from 'vitest'
import Checkbox from '../../components/atoms/Checkbox'
import { colors } from '../../styles'

describe('CheckBox', () => {
  it('renders correctly', async () => {
    render(<Checkbox id="idTest" label="Test label" />)

    const checkBoxTest = screen.getByLabelText('Test label')
    const labelTest = screen.getByText('Test label')

    expect(checkBoxTest).toBeInTheDocument()
    expect(labelTest).toBeInTheDocument()

    expect(checkBoxTest).toHaveAttribute('type', 'checkbox')
    expect(checkBoxTest).toHaveStyle(`border-color: ${colors.gray.gray3};`)
    expect(checkBoxTest).toHaveStyle('cursor: pointer')
    expect(checkBoxTest).not.toBeChecked()

    expect(labelTest).toHaveStyle('cursor: pointer')
    expect(labelTest).toHaveStyle(`color: ${colors.gray.gray2};`)

    fireEvent.click(checkBoxTest)

    await waitFor(() => expect(checkBoxTest).toBeChecked())
  })

  it('renders label that checks its checkbox when is clicked', async () => {
    render(<Checkbox id="idTest" label="Test label" />)

    const checkBoxTest = screen.getByLabelText('Test label')
    const labelTest = screen.getByText('Test label')

    expect(checkBoxTest).not.toBeChecked()

    expect(labelTest).toHaveStyle('cursor: pointer')

    fireEvent.click(labelTest)

    await waitFor(() => expect(checkBoxTest).toBeChecked())
  })

  it('renders checkbox checked by default when provided and user can uncheck it', async () => {
    render(<Checkbox id="idTest" label="Test label" defaultChecked />)

    const checkBoxTest = screen.getByLabelText('Test label')

    expect(checkBoxTest).toBeChecked()

    fireEvent.click(checkBoxTest)

    await waitFor(() => expect(checkBoxTest).not.toBeChecked())
  })

  it('renders correctly in disabled mode', () => {
    render(<Checkbox id="idTest" label="Test label" disabled />)

    const checkBoxTest = screen.getByLabelText('Test label')
    const labelTest = screen.getByText('Test label')

    expect(checkBoxTest).not.toBeChecked()
    expect(checkBoxTest).toBeDisabled()
    expect(checkBoxTest).toHaveStyle('cursor: not-allowed')
    expect(labelTest).toHaveStyle('cursor: not-allowed')
  })
})
