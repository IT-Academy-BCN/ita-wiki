import { vi } from 'vitest'
import { fireEvent, render, screen, waitFor } from '../test-utils'
import { AccessModalContent } from '../../components/molecules'

describe('AccessModalContent', () => {
  const handleLoginModal = vi.fn()
  const handleRegisterModal = vi.fn()
  const handleAccessModal = vi.fn()

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders correctly', () => {
    render(
      <AccessModalContent
        handleLoginModal={handleLoginModal}
        handleRegisterModal={handleRegisterModal}
        handleAccessModal={handleAccessModal}
      />
    )
    expect(screen.getByAltText('Lock Dynamic Icon')).toBeInTheDocument()
    expect(screen.getByText('Acceso restringido')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Registrarme' })
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Entrar' })).toBeInTheDocument()
  })

  it('should open Register modal when clicking the "Registrarme" button', async () => {
    render(
      <AccessModalContent
        handleLoginModal={handleLoginModal}
        handleRegisterModal={handleRegisterModal}
        handleAccessModal={handleAccessModal}
      />
    )

    fireEvent.click(screen.getByRole('button', { name: 'Registrarme' }))

    await waitFor(() => {
      expect(handleAccessModal).toHaveBeenCalled()
      expect(handleLoginModal).not.toHaveBeenCalled()
      expect(handleRegisterModal).toHaveBeenCalled()
    })
  })

  it('should open Login modal when clicking the "Entrar" button', async () => {
    render(
      <AccessModalContent
        handleLoginModal={handleLoginModal}
        handleRegisterModal={handleRegisterModal}
        handleAccessModal={handleAccessModal}
      />
    )

    fireEvent.click(screen.getByRole('button', { name: 'Entrar' }))

    await waitFor(() => {
      expect(handleAccessModal).toHaveBeenCalled()
      expect(handleLoginModal).toHaveBeenCalled()
      expect(handleRegisterModal).not.toHaveBeenCalled()
    })
  })
})
