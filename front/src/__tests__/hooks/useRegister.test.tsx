import { act, renderHook, waitFor } from '@testing-library/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { useRegister } from '../../hooks'
import { queryClient } from '../setup'

describe('useRegister hook', () => {
  it('should initialize the useRegister hook correctly', async () => {
    const { result } = renderHook(() => useRegister(() => {}), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    })
    expect(result.current.registerUser).toBeDefined()
    expect(result.current.isLoading).toBe(false)
    expect(result.current.isSuccess).toBe(false)
  })
  it('should register successfully', async () => {
    const { result } = renderHook(() => useRegister(() => {}), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    })
    act(() => {
      result.current.registerUser.mutateAsync({
        email: 'mail@example.com',
        password: 'password1',
        name: 'test',
        dni: '12345678',
        itineraryId: 'react',
        confirmPassword: 'password1',
        accept: true,
      })
    })
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
      expect(result.current.isSuccess).toBe(true)
    })
  })
  it('should show an error message if register fails', async () => {
    const { result } = renderHook(() => useRegister(() => {}), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    })
    act(() => {
      result.current.registerUser.mutateAsync({
        email: 'mail@example.com',
        password: 'password1',
        name: 'test',
        dni: '12345678',
        itineraryId: 'react',
        confirmPassword: 'passwordError',
        accept: true,
      })
    })
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
      expect(result.current.isSuccess).toBe(false)
    })
  })
})
