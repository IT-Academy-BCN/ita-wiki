import { useContext } from 'react'
import { NotificationsContext } from './context'
import { NActions, TNotification } from './reducer'

export function useNotifications() {
  const { state, dispatch } = useContext(NotificationsContext)

  const addNotification = (notification: Omit<TNotification, 'id'>) => {
    dispatch({ type: NActions.addNotification, payload: notification })
  }

  const removeNotification = (id: string) => {
    dispatch({ type: NActions.removeNotification, payload: { id } })
  }

  return {
    state,
    addNotification,
    removeNotification,
  }
}
