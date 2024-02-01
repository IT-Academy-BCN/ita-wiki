import { fireEvent, render, screen } from '@testing-library/react'
import { expect } from 'vitest'
import { Radio } from '../../components/atoms'
import { colors } from '../../styles'

const options = [
  {
    id: 'idTest1',
    name: 'idTest1',
    label: 'Test label 1',
  },
  {
    id: 'idTest2',
    name: 'idTest2',
    label: 'Test label 2',
  },
  {
    id: 'idTest3',
    name: 'idTest3',
    label: 'Test label 3',
  },
]

describe.skip('renders correctly', async () => {
  render(<Radio options={options} inputName="radioTest" />)

  test.each(options)('renders radio %s', ({ label }) => {
    const radioTest = screen.getByLabelText(label)
    const labelTest = screen.getByText(label)

    expect(radioTest).toBeInTheDocument()
    expect(labelTest).toBeInTheDocument()

    expect(radioTest).toHaveAttribute('type', 'radio')
    expect(radioTest).toHaveAttribute('name', 'radioTest')
    expect(radioTest).toHaveStyle(`color: ${colors.gray.gray2};`)

    expect(radioTest).not.toBeChecked()
  })
})

describe.skip('renders radio that checks its radio when is clicked', async () => {
  render(<Radio options={options} inputName="radioTest" />)

  test.each(options)('renders radio %s', ({ label }) => {
    const radioTest = screen.getByLabelText(label)
    const labelTest = screen.getByText(label)

    expect(radioTest).not.toBeChecked()

    fireEvent.click(labelTest)

    expect(radioTest).toBeChecked()
  })
})

describe.skip('renders radio checked by default when provided and user can uncheck it', () => {
  render(
    <Radio
      options={options}
      inputName="radioTest"
      defaultChecked={options[1].id}
    />
  )

  test.each(options)('renders radio %s', ({ label, id }) => {
    const radioTest = screen.getByLabelText(label)
    const labelTest = screen.getByText(label)

    if (id === options[1].id) {
      expect(radioTest).toBeChecked()
    } else {
      expect(radioTest).not.toBeChecked()
    }

    fireEvent.click(labelTest)

    expect(radioTest).toBeChecked()
  })
})
