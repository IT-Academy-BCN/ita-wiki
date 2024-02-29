import { renderHook, act, waitFor } from '@testing-library/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { useLogin } from '../../hooks'
import { queryClient } from '../setup'

describe('useLogin hook', () => {
  it('should initialize the useLogin hook correctly', async () => {
    const { result } = renderHook(() => useLogin(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    })
    expect(result.current.loginUser).toBeDefined()
    expect(result.current.responseError).toBe('')
    expect(result.current.isLoading).toBe(false)
    expect(result.current.isSuccess).toBe(false)
  })

  it('should login successfully', async () => {
    const { result } = renderHook(() => useLogin(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    })

    act(() => {
      result.current.loginUser.mutateAsync({
        dni: '12345678',
        password: 'password1',
      })
    })

    await waitFor(() => {
      expect(result.current.responseError).toBe('')
      expect(result.current.isLoading).toBe(false)
      expect(result.current.isSuccess).toBe(true)
    })
  })
  it('should show an error message if login fails', async () => {
    const { result } = renderHook(() => useLogin(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    })
    act(() => {
      result.current.loginUser.mutateAsync({
        dni: '12345678',
        password: 'passwordError',
      })
    })
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
      expect(result.current.isSuccess).toBe(false)
    })
    expect(result.current.responseError).toBe('')
  })
})
