import React, { FC, useContext, useEffect } from 'react'
import { NActions, TNotification } from './reducer'
import { NotificationsContext } from './context'

export const Notification: FC<TNotification> = ({
  id,
  title,
  description,
  autoClose = true,
  autoCloseTimeOut = 5000,
}) => {
  const { dispatch } = useContext(NotificationsContext)
  useEffect(() => {
    if (autoClose) {
      setTimeout(() => {
        dispatch({
          type: NActions.removeNotification,
          payload: { id },
        })
      }, autoCloseTimeOut)
    }
  }, [autoClose, autoCloseTimeOut, dispatch, id])

  return (
    <div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  )
}
