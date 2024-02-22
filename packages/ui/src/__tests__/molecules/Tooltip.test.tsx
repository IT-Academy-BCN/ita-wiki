import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import { Tooltip } from '../../components/molecules'
import { colors } from '../../styles'

const mockedBtnOnClick = vi.fn()

describe('Tooltip component', () => {
  it('renders correctly', async () => {
    render(
      <Tooltip $size="small" $tipPosition="top" tooltipTxt="Tooltip test">
        <p>Hover me</p>
      </Tooltip>
    )

    const targetText = screen.getByText('Hover me')

    expect(targetText).toBeInTheDocument()

    expect(screen.queryByText('Tooltip test')).not.toBeInTheDocument()

    fireEvent.mouseOver(targetText)

    const tooltip = screen.getByRole('tooltip')

    waitFor(() => expect(tooltip).toBeInTheDocument())
    expect(tooltip).toHaveTextContent('Tooltip test')
    expect(tooltip).toHaveStyle({
      position: 'absolute',
      borderRadius: '0.625rem',
      backgroundColor: `${colors.black.black3}`,
      minWidth: '135px',
      minHeight: '28px',
      bottom: 'calc(100% - 28px + 34px))',
      left: '50%',
    })

    fireEvent.mouseLeave(targetText)

    waitFor(() =>
      expect(screen.queryByText('Tooltip test')).not.toBeInTheDocument()
    )
  })

  it('renders medium tooltip with tip on the bottom', async () => {
    render(
      <Tooltip $size="medium" $tipPosition="bottom" tooltipTxt="Tooltip test">
        <p>Hover me</p>
      </Tooltip>
    )

    const targetText = screen.getByText('Hover me')

    fireEvent.mouseOver(targetText)

    const tooltip = screen.getByRole('tooltip')

    waitFor(() => expect(tooltip).toBeInTheDocument())
    expect(tooltip).toHaveTextContent('Tooltip test')
    expect(tooltip).toHaveStyle({
      position: 'absolute',
      borderRadius: '0.625rem',
      backgroundColor: `${colors.black.black3}`,
      minWidth: '82px',
      minHeight: '47px',
      bottom: 'calc(100% - 47px + 34px))',
      left: '50%',
    })
  })

  it('renders big tooltip with button and tip on the left', async () => {
    render(
      <Tooltip
        btnText="Click me"
        btnOnClick={mockedBtnOnClick}
        $size="big"
        $tipPosition="left"
        tooltipTxt="Big tooltip test with large text"
      >
        <p>Hover me</p>
      </Tooltip>
    )

    const targetText = screen.getByText('Hover me')

    fireEvent.mouseOver(targetText)

    const tooltip = screen.getByRole('tooltip')

    waitFor(() => expect(tooltip).toBeInTheDocument())
    expect(tooltip).toHaveTextContent('Big tooltip test with large text')
    expect(tooltip).toHaveStyle({
      position: 'absolute',
      borderRadius: '0.625rem',
      backgroundColor: `${colors.black.black3}`,
      minWidth: '271px',
      minHeight: '119px',
      left: 'calc(100% + 0.9rem)',
      top: '50%',
    })

    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('Click me')

    fireEvent.click(button)

    expect(mockedBtnOnClick).toHaveBeenCalled()
  })

  it('renders small tooltip with tip on the right', async () => {
    render(
      <Tooltip $size="small" $tipPosition="right" tooltipTxt="Tooltip test">
        <p>Hover me</p>
      </Tooltip>
    )

    const targetText = screen.getByText('Hover me')

    expect(targetText).toBeInTheDocument()

    fireEvent.mouseOver(targetText)

    const tooltip = screen.getByRole('tooltip')

    waitFor(() => expect(tooltip).toBeInTheDocument())
    expect(tooltip).toHaveTextContent('Tooltip test')
    expect(tooltip).toHaveStyle({
      position: 'absolute',
      borderRadius: '0.625rem',
      backgroundColor: `${colors.black.black3}`,
      minWidth: '135px',
      minHeight: '28px',
      right: 'calc(100% + 0.75rem)',
      top: '50%',
    })
  })
})
