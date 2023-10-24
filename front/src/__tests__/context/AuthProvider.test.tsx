import { ReactElement } from 'react'
import { renderHook } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { AuthProvider, useAuth } from '../../context/AuthProvider'

describe('AuthProvider', () => {
  it('should render children', () => {
    const wrapper = ({ children }: { children: ReactElement }) => (
      <AuthProvider>{children}</AuthProvider>
    )
    const { result } = renderHook(() => useAuth(), { wrapper })
    expect(result.current.user).toBe(null)
  })

  it('should set user', async () => {
    const wrapper = ({ children }: { children: ReactElement }) => (
      <AuthProvider>{children}</AuthProvider>
    )
    const { result } = renderHook(() => useAuth(), { wrapper })
    expect(result.current.user).toBe(null)
    act(() => {
      result.current.setUser({ name: 'John', avatar: 'avatar', email: 'email' })
    })
    expect(result.current.user).toEqual({
      name: 'John',
      avatar: 'avatar',
      email: 'email',
    })
  })

  it('should throw an error', async () => {
    renderHook(() => {
      try {
        useAuth()
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        if (e instanceof Error) {
          expect(`${e.message}`).toEqual(
            'useAuth must be used within an AuthProvider'
          )
        }
      }
    })
  })

  it('should  allow to set error', async () => {
    const wrapper = ({ children }: { children: ReactElement }) => (
      <AuthProvider>{children}</AuthProvider>
    )
    const { result } = renderHook(() => useAuth(), { wrapper })
    act(() => {
      result.current.setError('ERROR')
    })
    expect(result.current.error).toEqual('ERROR')
  })
})
