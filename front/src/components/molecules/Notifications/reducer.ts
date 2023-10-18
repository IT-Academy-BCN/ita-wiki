import { NActions, NotificationsActions, TInitialState } from './types'

export const notificationsReducer = (
  state: TInitialState,
  action: NotificationsActions
): TInitialState => {
  switch (action.type) {
    case NActions.addNotification: {
      const crypto = window.crypto || window.Crypto
      const array = new Uint32Array(1)
      const id = crypto.getRandomValues(array).toString()
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
