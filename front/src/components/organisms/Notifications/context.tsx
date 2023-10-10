/* eslint-disable react/jsx-no-constructed-context-values */
import { Dispatch, FC, ReactNode, createContext, useReducer } from 'react'
import {
  type TInitialState,
  NotificationsActions,
  notificationsReducer,
} from './reducer'

const initialState: TInitialState = {
  all: [],
  byId: {},
}

type TNotificationsContext = {
  state: TInitialState
  dispatch: Dispatch<NotificationsActions>
}

function createNotificationsContext(state: TInitialState) {
  return createContext<TNotificationsContext>({
    state,
    dispatch: () => null,
  })
}

export const NotificationsContext = createNotificationsContext(initialState)

type TNotificationsProvider = {
  children: ReactNode
}

export const NotificationsProvider: FC<TNotificationsProvider> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(notificationsReducer, initialState)

  return (
    <NotificationsContext.Provider value={{ state, dispatch }}>
      {children}
    </NotificationsContext.Provider>
  )
}
