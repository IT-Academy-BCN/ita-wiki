import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { Tabs } from '../../../components/molecules/Tabs'
import { colors } from '../../../styles'

const tabsTestData = [
  {
    title: 'Test A',
    tabComponent: <div>Test component content A</div>,
  },
  {
    title: 'Test B',
    tabComponent: <div>Test component content B</div>,
  },
  {
    title: 'Test C',
    tabComponent: <div>Test component content C</div>,
  },
]

describe('TabsManager component', () => {
  it('renders correctly', () => {
    render(<Tabs tabsData={tabsTestData} />)

    const tabA = screen.getByRole('button', {
      name: /test a/i,
    })

    const tabB = screen.getByRole('button', {
      name: /test b/i,
    })

    const tabC = screen.getByRole('button', {
      name: /test c/i,
    })

    expect(tabA).toBeInTheDocument()
    expect(tabB).toBeInTheDocument()
    expect(tabC).toBeInTheDocument()
    expect(screen.getByText('Test component content A')).toBeInTheDocument()
    expect(
      screen.queryByText('Test component content B')
    ).not.toBeInTheDocument()
    expect(
      screen.queryByText('Test component content C')
    ).not.toBeInTheDocument()
  })

  it('should change content tab according to click on menu tab', async () => {
    render(<Tabs tabsData={tabsTestData} />)

    const tabB = screen.getByRole('button', {
      name: /test b/i,
    })

    const tabC = screen.getByRole('button', {
      name: /test c/i,
    })

    fireEvent.click(tabB)

    await waitFor(() =>
      expect(screen.getByText('Test component content B')).toBeInTheDocument()
    )
    expect(
      screen.queryByText('Test component content A')
    ).not.toBeInTheDocument()
    expect(
      screen.queryByText('Test component content C')
    ).not.toBeInTheDocument()

    fireEvent.click(tabC)

    await waitFor(() =>
      expect(screen.getByText('Test component content C')).toBeInTheDocument()
    )
    expect(
      screen.queryByText('Test component content B')
    ).not.toBeInTheDocument()
  })

  it('shows default active tab when provided', () => {
    render(<Tabs tabsData={tabsTestData} defaultActiveTab={1} />)

    const tabA = screen.getByRole('button', {
      name: /test a/i,
    })

    const tabB = screen.getByRole('button', {
      name: /test b/i,
    })

    expect(tabA).toHaveStyle({ color: `${colors.gray.gray2}` })
    expect(tabA).toHaveStyle({
      borderBottom: `1px solid ${colors.primaryLight}`,
    })

    expect(tabB).toHaveStyle({ color: `${colors.black.black1}` })
    expect(tabB).toHaveStyle({
      borderBottom: `1px solid ${colors.primary}`,
    })

    expect(screen.getByText('Test component content B')).toBeInTheDocument()

    expect(
      screen.queryByText('Test component content A')
    ).not.toBeInTheDocument()
    expect(
      screen.queryByText('Test component content C')
    ).not.toBeInTheDocument()
  })
})
