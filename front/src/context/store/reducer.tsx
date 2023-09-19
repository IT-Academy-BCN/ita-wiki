// ==> ACTIONS TO MODIFY STATE

import { TAction, TFilterContext } from './types'

export const Actions = {
  SET_RESOURCES: 'SET_RESOURCES',
  SET_TYPES: 'SET_TYPES',
  SET_TOPICS: 'SET_TOPICS',
  SET_STATUS: 'SET_STATUS',
}

// ==> REDUCER
export const filtersReducer = (
  state: TFilterContext,
  action: TAction
): TFilterContext => {
  switch (action.type) {
    case Actions.SET_RESOURCES:
      return { ...state, types: action.payload }
    case Actions.SET_TYPES:
      return { ...state, types: action.payload }
    case Actions.SET_TOPICS:
      return { ...state, topics: action.payload }
    case Actions.SET_STATUS:
      return { ...state, status: action.payload }

    default:
      return state
  }
}
