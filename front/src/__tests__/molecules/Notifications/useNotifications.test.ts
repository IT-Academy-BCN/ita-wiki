import { act, renderHook } from '@testing-library/react'
import { NotificationsProvider } from '../../../components/molecules/Notifications'
import { useNotifications } from '../../../components/molecules/Notifications/useNotifications'

describe('useNotifications hook', () => {
  it('Should give state', () => {
    const { result } = renderHook(() => useNotifications(), {
      wrapper: NotificationsProvider,
    })
    expect(result.current.state.all).toEqual([])
    expect(result.current.state.byId).toEqual({})
  })

  it('Should add notifications', () => {
    const { result } = renderHook(() => useNotifications(), {
      wrapper: NotificationsProvider,
    })

    act(() => {
      result.current.addNotification({
        title: 'test title',
        description: 'test description',
        variant: 'warning',
      })
    })
    expect(result.current.state.all).toHaveLength(1)
  })
})
