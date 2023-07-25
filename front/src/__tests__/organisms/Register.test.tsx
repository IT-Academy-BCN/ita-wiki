import { vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import Register from '../../components/organisms/Register'
import { render, screen, waitFor } from '../test-utils'

describe('Register', () => {
  it('Register renders correctly', () => {
    const handleLoginModal = vi.fn()
    const handleRegisterModal = vi.fn()

    render(
      <Register
        handleLoginModal={handleLoginModal}
        handleRegisterModal={handleRegisterModal}
      />
    )
    expect(screen.getByText(/Registrarme/i)).toBeInTheDocument()
  })

  it('registers new users', async () => {
    const handleLoginModal = vi.fn()
    const handleRegisterModal = vi.fn()
    render(
      <Register
        handleLoginModal={handleLoginModal}
        handleRegisterModal={handleRegisterModal}
      />
    )
    await userEvent.type(screen.getByLabelText('dni'), '47163785P')
    await userEvent.type(screen.getByTestId('email'), 'email@email.com')
    await userEvent.type(screen.getByTestId('name'), 'Jane Doe')
    await userEvent.type(screen.getByLabelText('password'), 'password123AAAA')
    await userEvent.type(
      screen.getByLabelText('confirmPassword'),
      'password123AAAA'
    )
    await userEvent.selectOptions(screen.getByTestId('specialization'), 'react')
    await userEvent.click(screen.getByTestId('accept'))

    userEvent.click(screen.getByTestId('submitButton'))

    await waitFor(
      () => {
        expect(screen.getByTestId('registerSuccess')).toBeInTheDocument()
        expect(handleRegisterModal).toHaveBeenCalled()
      },
      { timeout: 5000 }
    )
  })
})
