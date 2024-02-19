import { renderHook } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { useNotifications } from '../../../components/molecules/Notifications/useNotifications'
import { NotificationsProvider } from '../../../components/molecules/Notifications'

describe('NotificationsProvider', () => {
  it('should render children', () => {
    const { result } = renderHook(() => useNotifications())
    expect(result.current.state.all).toStrictEqual([])
    expect(result.current.state.byId).toStrictEqual({})
  })

  it('should dispatch notifications', async () => {
    const { result } = renderHook(() => useNotifications(), {
      wrapper: NotificationsProvider,
    })
    expect(result.current.state.all).toStrictEqual([])

    act(() => {
      result.current.addNotification({
        title: 'title1',
        description: 'description1',
        variant: 'info',
      })
    })
    expect(result.current.state.all).toHaveLength(1)
  })
})
