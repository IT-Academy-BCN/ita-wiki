import React from 'react'
//import '@testing-library/jest-dom'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { expect, it, describe } from 'vitest'
import Checkbox from '../../../components/atoms/Checkbox'
import { colors } from './../../../styles'
//import { toBeChecked } from '@testing-library/jest-dom/matchers'

describe('CheckBox', () => {
  it('renders correctly', async () => {
    render(<Checkbox id='idTest' label='Test label' />)

    const checkBoxTest = screen.getByLabelText('Test label')
    const labelTest = screen.getByText('Test label')

    expect(checkBoxTest).toBeInTheDocument()
    expect(labelTest).toBeInTheDocument()

    expect(checkBoxTest).toHaveAttribute('type', 'checkbox')
    // //    expect(checkBoxTest).toHaveStyle(`color: ${colors.gray.gray3};`)

    expect(checkBoxTest).not.toBeCheched()

    fireEvent.click(checkBoxTest)

    await waitFor(() => expect(checkBoxTest).toBeChecked())
  })

  it('renders label that checks its checkbox when is clicked', async () => {
    render(<Checkbox id='idTest' label='Test label' />)

    const checkBoxTest = screen.getByLabelText('Test label')
    const labelTest = screen.getByText('Test label')

    expect(checkBoxTest).not.toBeChecked()

    fireEvent.click(labelTest)

    await waitFor(() => expect(checkBoxTest).toBeChecked())
  })

  it('renders checkbox checked by default when provided and user can uncheck it', async () => {
    render(<Checkbox id='idTest' label='Test label' defaultChecked />)

    const checkBoxTest = screen.getByLabelText('Test label')

    expect(checkBoxTest).toBeChecked()

    fireEvent.click(checkBoxTest)

    await waitFor(() => expect(checkBoxTest).not.toBeChecked())
  })
})
