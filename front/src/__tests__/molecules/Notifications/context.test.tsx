import { ReactElement } from 'react'
import { renderHook } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { FiltersProvider } from '../../../context/store/context'
import { useNotifications } from '../../../components/molecules/Notifications/useNotifications'

describe('NotificationsProvider', () => {
  it('should render children', () => {
    const wrapper = ({ children }: { children: ReactElement }) => (
      <FiltersProvider>{children}</FiltersProvider>
    )

    const { result } = renderHook(() => useNotifications(), { wrapper })
    expect(result.current.state.all).toStrictEqual([])
    expect(result.current.state.byId).toStrictEqual({})
  })

  it('should add notifications', async () => {
    const wrapper = ({ children }: { children: ReactElement }) => (
      <FiltersProvider>{children}</FiltersProvider>
    )

    const { result } = renderHook(() => useNotifications(), { wrapper })
    act(() => {
      expect(result.current.state.all).toStrictEqual([])
      result.current.addNotification({
        all: ['testid'],
        byId: {},
      })
    })
  })
})
