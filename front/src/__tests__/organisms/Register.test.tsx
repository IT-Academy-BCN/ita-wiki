import { vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import Register, { validatePassword } from '../../components/organisms/Register'
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
    expect(screen.getByText(/Registrar-me/i)).toBeInTheDocument()
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
    await userEvent.selectOptions(
      screen.getByLabelText('specialization'),
      'React'
    )
    await userEvent.click(screen.getByTestId('accept'))

    await userEvent.click(screen.getByTestId('submitButton'))

    await waitFor(
      () => {
        expect(screen.getByTestId('registerSuccess')).toBeInTheDocument()
        expect(handleRegisterModal).toHaveBeenCalled()
      },
      { timeout: 5000 }
    )
  })
  it('shows an error message for an invalid password on submit', async () => {
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
    await userEvent.type(screen.getByLabelText('password'), 'abcD/?123')
    await userEvent.type(screen.getByLabelText('confirmPassword'), 'abcD/?123')
    await userEvent.selectOptions(
      screen.getByLabelText('specialization'),
      'React'
    )
    await userEvent.click(screen.getByTestId('accept'))

    await userEvent.click(screen.getByTestId('submitButton'))

    await waitFor(() => {
      expect(
        screen.getByText(
          /La contrasenya ha de tenir almenys 8 caràcters i contenir només lletres i números/i
        )
      ).toBeInTheDocument()
    })
  })
})
describe('validatePassword', () => {
  it('returns true for a valid password', () => {
    const validPasswords = ['Password123', 'AnotherValid123', '12345678']
    validPasswords.forEach((password) => {
      expect(validatePassword(password)).toBe(true)
    })
  })

  it('returns false for an invalid password', () => {
    const invalidPasswords = ['short', 'no123', 'With@Symbol', '']
    invalidPasswords.forEach((password) => {
      expect(validatePassword(password)).toBe(false)
    })
  })
})
