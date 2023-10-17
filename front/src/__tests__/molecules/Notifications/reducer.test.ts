import { notificationsReducer } from '../../../components/molecules/Notifications'
import {
  NActions,
  NotificationsActions,
  TInitialState,
} from '../../../components/molecules/Notifications/types'

describe('Notifications reducer', () => {
  it('Should handle NActions.addNotification', () => {
    const initialState: TInitialState = {
      all: [],
      byId: {},
    }

    const action: NotificationsActions = {
      type: NActions.addNotification,
      payload: {
        title: 'title',
        description: 'description',
        variant: 'info',
      },
    }

    const newState = notificationsReducer(initialState, action)

    expect(newState.all).toHaveLength(1)
    expect(newState.byId).toEqual({
      [newState.all[0]]: {
        title: 'title',
        description: 'description',
        variant: 'info',
        id: expect.any(String),
      },
    })
  })

  it('Should handle NActions.removeNotification', () => {
    const initialState: TInitialState = {
      all: ['test1', 'test2'],
      byId: {
        test1: {
          title: 'title1',
          description: 'description1',
          variant: 'info',
          id: 'test1',
        },
        test2: {
          title: 'title2',
          description: 'description2',
          variant: 'warning',
          id: 'test2',
        },
      },
    }

    const action: NotificationsActions = {
      type: NActions.removeNotification,
      payload: {
        id: 'test1',
      },
    }
    const newState = notificationsReducer(initialState, action)

    expect(newState.all).not.toContain('test1')
    expect(newState.byId).not.toHaveProperty('test1')
  })
})
