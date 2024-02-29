export type TVariant = 'success' | 'warning' | 'error' | 'info'

export type TNotification = {
  id: string
  title: string
  description: string
  variant: TVariant
  autoClose?: boolean
  autoCloseTimeOut?: number
}

export enum NActions {
  addNotification = 'addNotification',
  removeNotification = 'removeNotification',
}

export type TInitialState = {
  all: string[]
  byId: { [key: string]: TNotification }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key
      }
    : {
        type: Key
        payload: M[Key]
      }
}

type NotificationsPayload = {
  [NActions.addNotification]: Omit<TNotification, 'id'>
  [NActions.removeNotification]: Pick<TNotification, 'id'>
}

export type NotificationsActions =
  ActionMap<NotificationsPayload>[keyof ActionMap<NotificationsPayload>]
