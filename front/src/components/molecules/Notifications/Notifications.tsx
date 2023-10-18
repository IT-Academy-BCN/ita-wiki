import { useContext } from 'react'
import styled from 'styled-components'
import Notification from './Notification'
import { NotificationsContext } from './context'

const NotificationsContainer = styled.div`
  position: fixed;
  z-index: 100;
  align-self: flex-end;
`

export const Notifications = () => {
  const { state } = useContext(NotificationsContext)
  const hasNotifications = Object.keys(state.byId).length > 0

  return hasNotifications ? (
    <NotificationsContainer data-testid="notifications-test">
      {Object.values(state.byId).map((notification) => (
        <Notification key={notification.id} {...notification} />
      ))}
    </NotificationsContainer>
  ) : null
}

export default Notifications
