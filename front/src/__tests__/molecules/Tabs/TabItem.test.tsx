import { vi } from 'vitest'
import { render, screen, waitFor, fireEvent } from '../../test-utils'
import { TabItem } from '../../../components/molecules/Tabs/TabItem'
import { colors } from '../../../styles'

describe.skip('TabItem component', () => {
  const onClickItem = vi.fn()
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders correctly as inactive tab', async () => {
    render(
      <TabItem
        title="Test"
        index={0}
        isActive={false}
        setActiveTab={onClickItem}
      />
    )

    const tabTitle = screen.getByText(/test/i)
    expect(tabTitle).toBeInTheDocument()
    expect(tabTitle).toHaveStyle({ color: `${colors.gray.gray3}` })
    expect(tabTitle).toHaveStyle({ borderBottom: '1px solid transparent' })

    fireEvent.click(tabTitle)

    await waitFor(() => expect(onClickItem).toHaveBeenCalled())
  })

  it('renders correctly as active tab', async () => {
    render(
      <TabItem title="Test" index={0} isActive setActiveTab={onClickItem} />
    )

    const tabTitle = screen.getByText(/test/i)
    expect(tabTitle).toHaveStyle({ color: `${colors.black.black1}` })
    expect(tabTitle).toHaveStyle({
      borderBottom: `1px solid ${colors.primary}`,
    })
  })
})
