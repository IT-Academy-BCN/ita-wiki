import { useContext } from 'react'
import Notification from './Notification'
import { NotificationsContext } from './context'

export const Notifications = () => {
  const { state } = useContext(NotificationsContext)
  const hasNotifications = Object.keys(state.byId).length > 0

  return hasNotifications ? (
    <>
      {Object.values(state.byId).map((notification) => (
        <Notification key={notification.id} {...notification} />
      ))}
    </>
  ) : null
}

export default Notifications
