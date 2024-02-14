import { generateRandomID } from './generateRandomID'
import { NActions, NotificationsActions, TInitialState } from './types'

export const notificationsReducer = (
  state: TInitialState,
  action: NotificationsActions
): TInitialState => {
  switch (action.type) {
    case NActions.addNotification: {
      const id = generateRandomID()
      return {
        ...state,
        all: [...state.all, id],
        byId: {
          ...state.byId,
          [id]: {
            autoClose: true,
            autoCloseTimeOut: 5000,
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
