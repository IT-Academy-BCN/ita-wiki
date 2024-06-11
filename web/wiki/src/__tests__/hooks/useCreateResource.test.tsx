import { renderHook, act, waitFor } from '@testing-library/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { vi } from 'vitest'
import { setupServer } from 'msw/node'
import { useCreateResource } from '../../hooks'
import { queryClient } from '../setup'
import { reloadPage } from '../../utils/navigation'
import { handlers } from '../../__mocks__/handlers'

const server = setupServer(...handlers)
beforeEach(() => {
  server.listen()
})

afterEach(() => {
  server.resetHandlers()
  queryClient.clear()
})

afterAll(() => {
  server.close()
})

describe('useCreateResource hook', () => {
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

  it('should initialize the useCreateResource hook correctly', async () => {
    const { result } = renderHook(() => useCreateResource(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    })

    expect(result.current.createResource).toBeDefined()
    expect(result.current.isLoading).toBe(false)
    expect(result.current.isSuccess).toBe(false)
    expect(result.current.responseError).toBe('')
  })

  it('should call createResourceFetcher on resource creation', async () => {
    const { result } = renderHook(() => useCreateResource(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    })

    act(() => {
      result.current.createResource.mutate({
        title: 'title',
        description: 'description',
        url: 'url',
        topics: ['cli04v2l0000008mq5pwx7w5j'],
        resourceType: 'cli04v2l0000008mq5pwx7w5j',
        categoryId: 'cli04v2l0000008mq5pwx7w5j',
      })
    })

    await waitFor(() => {
      expect(result.current.createResource).toBeTruthy()
      expect(result.current.createResource.isLoading).toBe(false)
      expect(result.current.createResource.isSuccess).toBe(true)
      expect(result.current.responseError).toBe('')
    })
  })
})
