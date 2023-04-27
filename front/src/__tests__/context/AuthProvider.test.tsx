import { ReactElement } from 'react'
import { renderHook } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { AuthProvider, useAuth } from '../../context/AuthProvider'

describe('AuthProvider', () => {
  it('should render children', async () => {
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
      result.current.setUser({ name: 'John', avatar: 'avatar' })
    })
    expect(result.current.user).toEqual({ name: 'John', avatar: 'avatar' })
  })

  it('should throw an error', async () => {
    renderHook(() => {
      try {
        useAuth()
      } catch (e: any) {
        if (e instanceof Error) {
          expect(`${e.message}`).toEqual(
            'useAuth must be used within an AuthProvider'
          )
        }
      }
    })
  })
})
