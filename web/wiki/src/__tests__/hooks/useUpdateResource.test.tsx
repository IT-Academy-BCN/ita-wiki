import { renderHook, act, waitFor } from '@testing-library/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { vi } from 'vitest'
import { useUpdateResource } from '../../hooks'
import { queryClient } from '../setup'
import { reloadPage } from '../../utils/navigation'

afterEach(() => {
  queryClient.clear()
})

describe('useUpdateResource hook', () => {
  const reload = vi.fn(() => reloadPage)

  vi.mock('../utils/navigation', async () => {
    const actual: Record<number, unknown> = await vi.importActual(
      '../../utils/navigation'
    )
    return {
      ...actual,
      reloadPage: reload,
    }
  })

  beforeEach(() => {
    vi.mock('react-router-dom', async () => {
      const actual: Record<number, unknown> = await vi.importActual(
        'react-router-dom'
      )
      return {
        ...actual,
      }
    })
  })

  it('should initialize the useUpdateResource hook correctly', async () => {
    const { result } = renderHook(() => useUpdateResource(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    })

    expect(result.current.updateResource).toBeDefined()
    expect(result.current.isLoading).toBe(false)
    expect(result.current.isSuccess).toBe(false)
    expect(result.current.updateResource.error).toBe(null)
  })

  it('should call updateResourceFetcher on resource update', async () => {
    const { result } = renderHook(() => useUpdateResource(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    })

    act(() => {
      result.current.updateResource.mutate({
        title: 'updatedTitle',
        description: 'updatedDescription',
        url: 'updatedUrl',
        topics: ['cli04v2l0000008mq5pwx7w5j'],
        resourceType: 'cli04v2l0000008mq5pwx7w5j',
        categoryId: 'cli04v2l0000008mq5pwx7w5j',
        resourceId: 'resource-id',
      })
    })

    await waitFor(() => {
      expect(result.current.updateResource).toBeTruthy()
      expect(result.current.updateResource.isLoading).toBe(false)
      expect(result.current.updateResource.isSuccess).toBe(true)
      expect(result.current.updateResource.error).toBe(null)
    })
  })
})
