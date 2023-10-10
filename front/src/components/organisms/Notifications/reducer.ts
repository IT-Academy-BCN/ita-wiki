export type TNotification = {
  id: string
  title: string
  description: string
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

type NotificationsPayload = {
  [NActions.addNotification]: Omit<TNotification, 'id'>
  [NActions.removeNotification]: Pick<TNotification, 'id'>
}

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key
      }
    : {
        type: Key
        payload: M[Key]
      }
}

export type NotificationsActions =
  ActionMap<NotificationsPayload>[keyof ActionMap<NotificationsPayload>]

export const notificationsReducer = (
  state: TInitialState,
  action: NotificationsActions
): TInitialState => {
  switch (action.type) {
    case NActions.addNotification: {
      const id = Math.random().toString(36).substr(2, 9)
      return {
        ...state,
        all: [...state.all, id],
        byId: {
          ...state.byId,
          [id]: {
            ...action.payload,
            id,
          },
        },
      }
    }
    case NActions.removeNotification: {
      const { id: idToRemove } = action.payload
      const all = state.all.filter((id) => id !== idToRemove)
      const byId = { ...state.byId }
      delete byId[idToRemove]
      return {
        ...state,
        all: [...all],
        byId,
      }
    }

    default:
      return state
  }
}
