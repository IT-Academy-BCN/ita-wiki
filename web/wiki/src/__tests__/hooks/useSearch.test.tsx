import { renderHook } from '@testing-library/react'
import { useSearch } from '../../hooks'

const items = [{ title: 'item1' }, { title: 'item2' }]

describe('useSearch', () => {
  it('returns initial items when query is empty', () => {
    const { result } = renderHook(() => useSearch(items, ''))
    expect(result.current.filteredItems).toEqual(items)
  })

  it('filters items based on query', () => {
    const { result, rerender } = renderHook(
      ({ query }) => useSearch(items, query),
      { initialProps: { items, query: '' } }
    )
    rerender({ items, query: 'item1' })
    expect(result.current.filteredItems).toEqual([items[0]])
  })
})
