import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useMemo,
  useReducer,
  useState,
} from 'react'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { getCategories } from '../../helpers'
import {
  TGetTopics,
  TGetTypes,
  getTopics,
  getTypes,
} from '../../helpers/fetchers'
import { filtersReducer } from './reducer'
import { TFilterContext, TResource } from './types'

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
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const [filters, dispatch] = useReducer(filtersReducer, {
    ...defaultFilters,
    resources,
    topics,
    types,
  })

  //   const value = useMemo(() => ({ filters, dispatch }), [filters])

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
