import { I18nextProvider } from 'react-i18next'
import { useRoles } from '../../hooks/useRoles'
import { renderHook, waitFor } from '../test-utils'
import { UserRole } from '../../types'
import i18n from '../../i18n'

describe('useRoles hook', () => {
  it('returns translated roles', async () => {
    const { result } = renderHook(() => useRoles(), {
      wrapper: ({ children }) => (
        <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
      ),
    })

    await waitFor(() => expect(result.current.roles).toBeTruthy())

    expect(result.current.roles).toEqual([
      {
        id: UserRole.ADMIN,
        name: 'Administrador',
        slug: UserRole.ADMIN,
      },
      {
        id: UserRole.REGISTERED,
        name: 'Registrat',
        slug: UserRole.REGISTERED,
      },
      {
        id: UserRole.MENTOR,
        name: 'Mentor',
        slug: UserRole.MENTOR,
      },
    ])
  })
})
