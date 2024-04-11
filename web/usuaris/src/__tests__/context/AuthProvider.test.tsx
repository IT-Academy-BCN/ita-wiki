import { ReactElement } from 'react'
import { renderHook } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { AuthProvider, useAuth, type TUser } from '../../context/AuthProvider'

const mockUser: TUser = {
  dni: '12345678A',
  email: 'user@example.cat',
  role: 'ADMIN',
}
describe('AuthProvider', () => {
  it('should render children', () => {
    const wrapper = ({ children }: { children: ReactElement }) => (
      <AuthProvider>{children}</AuthProvider>
    )

    const { result } = renderHook(() => useAuth(), { wrapper })
    expect(result.current.user).toBe(null)
  })

  it('should set user', () => {
    const wrapper = ({ children }: { children: ReactElement }) => (
      <AuthProvider>{children}</AuthProvider>
    )

    const { result } = renderHook(() => useAuth(), { wrapper })
    expect(result.current.user).toBe(null)

    act(() => {
      result.current.setUser(mockUser)
    })

    expect(result.current.user).toEqual(mockUser)
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

  it('should allow to set error', () => {
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
