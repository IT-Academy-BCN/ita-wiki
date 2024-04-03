import { act, renderHook, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import { useDebounce } from '../../../components/molecules'

beforeEach(() => {
  vi.useFakeTimers()
})

afterEach(() => {
  vi.useRealTimers()
})

describe('useDebounce hook', () => {
  it('should debounce the value', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'test', delay: 500 },
      }
    )

    expect(result.current).toBe('test')

    act(() => {
      rerender({ value: 'changed', delay: 500 })
    })

    expect(result.current).toBe('test')

    act(() => {
      vi.advanceTimersByTime(500)

      waitFor(() => {
        expect(result.current).toBe('changed')
      })
    })
  })
})
