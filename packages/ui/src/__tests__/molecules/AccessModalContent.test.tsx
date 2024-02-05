import { vi } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
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
        loginBtnTitle="Login"
        registerBtnTitle="Register"
        img={{
          svgSrc: 'test',
          svgAlt: 'alt test',
        }}
        title="Title test"
        userMsg="user message test"
      />
    )
    expect(screen.getByAltText('alt test')).toBeInTheDocument()
    expect(screen.getByText(/title test/i)).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /register/i })
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument()
  })

  it('should open Register modal when clicking the "Register" button', async () => {
    render(
      <AccessModalContent
        handleLoginModal={handleLoginModal}
        handleRegisterModal={handleRegisterModal}
        handleAccessModal={handleAccessModal}
        loginBtnTitle="Login"
        registerBtnTitle="Register"
        img={{
          svgSrc: 'test',
          svgAlt: 'alt test',
        }}
        title="Title test"
        userMsg="user message test"
      />
    )

    fireEvent.click(screen.getByRole('button', { name: /Register/i }))

    await waitFor(() => {
      expect(handleAccessModal).toHaveBeenCalled()
      expect(handleLoginModal).not.toHaveBeenCalled()
      expect(handleRegisterModal).toHaveBeenCalled()
    })
  })

  it('should open Login modal when clicking the "Login" button', async () => {
    render(
      <AccessModalContent
        handleLoginModal={handleLoginModal}
        handleRegisterModal={handleRegisterModal}
        handleAccessModal={handleAccessModal}
        loginBtnTitle="Login"
        registerBtnTitle="Register"
        img={{
          svgSrc: 'test',
          svgAlt: 'alt test',
        }}
        title="Title test"
        userMsg="user message test"
      />
    )

    fireEvent.click(screen.getByRole('button', { name: /login/i }))

    await waitFor(() => {
      expect(handleAccessModal).toHaveBeenCalled()
      expect(handleLoginModal).toHaveBeenCalled()
      expect(handleRegisterModal).not.toHaveBeenCalled()
    })
  })
})
