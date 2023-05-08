import { render, screen } from '@testing-library/react'
import { expect } from 'vitest'
import userEvent from '@testing-library/user-event'
import { Dropdown } from '../../components/atoms'
import { colors } from '../../styles'

describe('Dropdown', () => {
  it('renders correctly', () => {
    render(<Dropdown />)

    const dropdown = screen.getByTestId('dropdown')

    expect(dropdown).toBeInTheDocument()
    expect(dropdown).toHaveStyle(`border: 1px solid ${colors.gray.gray3};`)
    expect(dropdown).toHaveTextContent(/vídeos/i)
    expect(screen.queryByText(/blogs/i)).not.toBeInTheDocument()
  })

  it('renders dropdown options when user clicks on it', async () => {
    render(<Dropdown />)

    const dropdownHeader = screen.getByTestId('header')

    await userEvent.click(dropdownHeader)

    expect(screen.queryByTestId('menu')).toBeInTheDocument()
    expect(screen.queryByText(/blogs/i)).toBeVisible()
  })

  it('renders options provided as props instead of default options', () => {
    const testOptions = [
      { value: 'testValue', label: 'Test' },
      { value: 'testValueTwo', label: 'Test2' },
      { value: 'testValueThree', label: 'Test3' },
    ]

    render(<Dropdown options={testOptions} />)

    const dropdown = screen.getByTestId('dropdown')

    expect(dropdown).toHaveTextContent(/test/i)
    expect(dropdown).not.toHaveTextContent(/vídeos/i)
  })

  it('renders option clicked by user in dropdown header and closes the menu', async () => {
    render(<Dropdown />)

    const dropdownHeader = screen.getByTestId('header')

    expect(dropdownHeader.textContent).toBe('Vídeos')

    await userEvent.click(dropdownHeader)

    expect(screen.getByTestId('menu')).toBeInTheDocument()

    await userEvent.click(screen.getByText(/blog/i))

    expect(dropdownHeader.textContent).toBe('Blogs')
    expect(dropdownHeader.textContent).not.toBe('Vídeos')
    expect(screen.queryByTestId('menu')).not.toBeInTheDocument()
  })

  it('a click outside the dropdown closes its menu', async () => {
    render(<Dropdown />)

    const dropdownHeader = screen.getByTestId('header')

    await userEvent.click(dropdownHeader)
    expect(screen.getByTestId('menu')).toBeVisible()

    await userEvent.click(document.body)
    expect(screen.queryByTestId('menu')).not.toBeInTheDocument()
  })
})
