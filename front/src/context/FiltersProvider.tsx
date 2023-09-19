import { useQuery } from '@tanstack/react-query'
import React, {
  FC,
  ReactNode,
  createContext,
  useContext,
  useMemo,
  useReducer,
  useState,
} from 'react'
import { useParams } from 'react-router-dom'
import { getCategories } from '../helpers'
import { TGetTopics, TGetTypes, getTopics, getTypes } from '../helpers/fetchers'

type TResource = {
  id: string
  title: string
  slug: string
  description: string
  url: string
  resourceType: string
  createdAt: string
  updatedAt: string
  user: {
    name: string
    email: string
  }
  topics: {
    topic: {
      id: string
      name: string
      slug: string
      categoryId: string
      createdAt: string
      updatedAt: string
    }
  }[]
  voteCount: {
    upvote: number
    downvote: number
    total: number
  }
  editable: boolean
}

type TFilterContext = {
  resources: TResource[]
  types: string[]
  topics: string[]
  status: string[]
  dispatch: React.Dispatch<TAction>
}

// ==> ACTIONS TO MODIFY STATE
type TAction =
  // ==> OJO: RESOURCES
  | { type: 'SET_RESOURCES'; payload: string[] }
  | { type: 'SET_TYPES'; payload: string[] }
  | { type: 'SET_TOPICS'; payload: string[] }
  | { type: 'SET_STATUS'; payload: string[] }

// ==> REDUCER
const filtersReducer = (
  state: TFilterContext,
  action: TAction
): TFilterContext => {
  switch (action.type) {
    case 'SET_TYPES':
      return { ...state, types: action.payload }
    case 'SET_TOPICS':
      return { ...state, topics: action.payload }
    case 'SET_STATUS':
      return { ...state, status: action.payload }

    default:
      return state
  }
}

const FiltersContext = createContext<TFilterContext | undefined>(undefined)

const defaultFilters: TFilterContext = {
  resources: [],
  types: [],
  topics: [],
  status: [],
  dispatch: () => {},
}

const FiltersProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { data: fetchedResources } = useQuery<TResource[]>(
    ['getCategories'],
    getCategories
  )

  const [resources] = useState<TResource[]>(fetchedResources || [])

  const { slug } = useParams()

  //  TOPICS
  const { data: fetchedTopics } = useQuery<TGetTopics>(
    ['getTopics', slug || ''],
    () => getTopics(slug)
  )

  const topics = useMemo(
    () =>
      fetchedTopics
        ? ['todos', ...fetchedTopics.map((topic) => topic.slug)]
        : [],
    [fetchedTopics]
  )

  // TYPES
  const { data: fetchedTypes } = useQuery<TGetTypes>(['getTypes'], getTypes)
  const [types] = useState<TGetTypes>(fetchedTypes || [])

  // ==> CREATE STATE AND DISPATCH FUNCTION
  const [filters, dispatch] = useReducer(filtersReducer, {
    ...defaultFilters,
    resources,
    topics,
    types,
  })

  return (
    <FiltersContext.Provider value={filters}>
      {children}
    </FiltersContext.Provider>
  )
}

// ==> CUSTOM HOOK TO USE CONTEXT
const useFiltersContext = () => {
  const context = useContext(FiltersContext)
  if (!context) {
    throw new Error('useFiltersContext has to be used inside a FiltersProvider')
  }
  return context
}

export { FiltersProvider, useFiltersContext }
