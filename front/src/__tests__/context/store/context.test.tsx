import { ReactElement } from 'react'
import { renderHook } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import {
  FiltersProvider,
  useFiltersContext,
} from '../../../context/store/context'
import { ActionTypes } from '../../../context/store/types'

describe('FiltersProvider', () => {
  it('should render children', () => {
    const wrapper = ({ children }: { children: ReactElement }) => (
      <FiltersProvider>{children}</FiltersProvider>
    )
    const { result } = renderHook(() => useFiltersContext(), { wrapper })
    expect(result.current.resources).toStrictEqual([])
  })

  it('should throw an error', async () => {
    renderHook(() => {
      try {
        useFiltersContext()
      } catch (error: unknown) {
        if (error instanceof Error) {
          expect(`${error.message}`).toEqual(
            'useFiltersContext has to be used inside a FiltersProvider'
          )
        }
      }
    })
  })

  it('should dispatch filters', async () => {
    const wrapper = ({ children }: { children: ReactElement }) => (
      <FiltersProvider>{children}</FiltersProvider>
    )

    const { result } = renderHook(() => useFiltersContext(), { wrapper })
    act(() => {
      expect(result.current.topics).toStrictEqual('todos')
      result.current.dispatch({
        type: ActionTypes.SetTopics,
        payload: {
          topics: 'topicsTest',
        },
      })
    })
    expect(result.current.topics).toEqual('topicsTest')
  })
})
