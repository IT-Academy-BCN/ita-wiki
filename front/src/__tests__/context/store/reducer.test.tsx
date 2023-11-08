import { vi } from 'vitest'
import { filtersReducer } from '../../../context/store/reducer'
import {
  ActionTypes,
  FiltersAction,
  TInitialState,
} from '../../../context/store/types'

const initialState: TInitialState = {
  resources: [],
  types: [],
  topics: '',
  status: [],
  dispatch: vi.fn(),
}

describe('filters reducer', () => {
  it('Should handle ActionTypes.SetResources', () => {
    const resourceTest = {
      id: 'string',
      title: 'My Resource in Javascript',
      slug: 'my-resource-in-javascript',
      description: 'Lorem ipsum javascript',
      url: 'https://tutorials.cat/learn/javascript',
      resourceType: 'BLOG',
      createdAt: 'string',
      updatedAt: 'string',
      user: {
        name: 'string',
        email: 'user@example.cat',
      },
      topics: [
        {
          topic: {
            id: 'string',
            name: 'React Props',
            slug: 'react-props',
            categoryId: 'string',
            createdAt: 'string',
            updatedAt: 'string',
          },
        },
      ],
      voteCount: {
        upvote: 14,
        downvote: 2,
        total: 12,
        userVote: 1,
      },
      editable: true,
      isFavorite: false,
    }

    const action: FiltersAction = {
      type: ActionTypes.SetResources,
      payload: {
        resources: [resourceTest],
      },
    }

    const newResourceState = filtersReducer(initialState, action)

    expect(newResourceState).toEqual({
      resources: [resourceTest],
      types: [],
      topics: '',
      status: [],
      dispatch: initialState.dispatch,
    })
  })

  it('Should handle ActionTypes.SetTypes', () => {
    const action: FiltersAction = {
      type: ActionTypes.SetTypes,
      payload: { types: ['TypeTest'] },
    }

    const newTypeState = filtersReducer(initialState, action)

    expect(newTypeState).toEqual({
      resources: [],
      types: ['TypeTest'],
      topics: '',
      status: [],
      dispatch: initialState.dispatch,
    })
  })

  it('Should handle ActionTypes.SetTopics', () => {
    const action: FiltersAction = {
      type: ActionTypes.SetTopics,
      payload: { topics: 'topicTest' },
    }

    const newTopicState = filtersReducer(initialState, action)

    expect(newTopicState).toEqual({
      resources: [],
      types: [],
      topics: 'topicTest',
      status: [],
      dispatch: initialState.dispatch,
    })
  })

  it('Should handle ActionTypes.SetStatus', () => {
    const action: FiltersAction = {
      type: ActionTypes.SetStatus,
      payload: { status: ['not seen'] },
    }

    const newStatusState = filtersReducer(initialState, action)

    expect(newStatusState).toEqual({
      resources: [],
      types: [],
      topics: '',
      status: ['not seen'],
      dispatch: initialState.dispatch,
    })
  })
})
