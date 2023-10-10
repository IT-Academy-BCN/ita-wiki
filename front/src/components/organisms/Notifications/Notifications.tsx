import React, { useContext } from 'react'
import { NotificationsContext } from './context'
import { Notification } from './Notification'

export const Notifications = () => {
  const { state } = useContext(NotificationsContext)
  const hasNotifications = Object.keys(state.byId).length > 0
  return hasNotifications ? (
    <>
      {Object.values(state.byId).map((n) => (
        <Notification key={n.id} {...n} />
      ))}
    </>
  ) : null
}
