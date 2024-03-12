import { screen, fireEvent, render } from '@testing-library/react'
import { vi } from 'vitest'
import { CardProfile } from '../../components/molecules'

const mockLogOut = vi.fn()

describe('CardProfile', () => {
  it('renders correctly with all given props', () => {
    const counterData = [
      {
        number: 3,
        text: 'Aportaciones',
        icon: 'attach_file',
        isError: false,
        errorMessage: 'n/d',
      },
      {
        number: 23,
        text: 'Votos recibidos',
        icon: 'expand_less',
        isError: false,
        errorMessage: 'n/d',
      },
      {
        number: 15,
        text: 'Favoritos guardados',
        icon: 'favorite',
        isError: false,
        errorMessage: 'n/d',
      },
    ]

    render(
      <CardProfile
        userData={{
          profilePicture: '/test-img.jpg',
          profilePictureAlt: 'No user image',
          userName: 'test-name',
          userEmail: 'test@test.com',
        }}
        counterData={counterData}
        logoutData={{
          logoutIcon: { name: 'power_settings_new' },
          handleLogOut: mockLogOut,
          logoutMsg: 'Logout',
        }}
      />
    )

    expect(screen.getByAltText(/no user image/i)).toBeInTheDocument()

    expect(screen.getByText(/test-name/i)).toBeInTheDocument()

    expect(screen.getByText(/test@test.com/i)).toBeInTheDocument()

    const button: HTMLButtonElement = screen.getByRole('button')
    expect(button).toHaveTextContent(/logout/i)
    expect(screen.getByText(/power_settings_new/i)).toBeInTheDocument()

    fireEvent.click(button)
    expect(mockLogOut).toHaveBeenCalled()

    expect(screen.getByTestId(/aportaciones/i)).toHaveTextContent('3')
    expect(screen.getByText(/aportaciones/i)).toBeInTheDocument()

    expect(screen.getByTestId(/votos recibidos/i)).toHaveTextContent('23')
    expect(screen.getByText(/votos recibidos/i)).toBeInTheDocument()

    expect(screen.getByTestId(/favoritos guardados/i)).toHaveTextContent('15')
    expect(screen.getByText(/favoritos guardados/i)).toBeInTheDocument()
  })
  it('renders correctly server errors', () => {
    const counterData = [
      {
        number: 3,
        text: 'Aportaciones',
        icon: 'attach_file',
        isError: true,
        errorMessage: 'n/d',
      },
      {
        number: 23,
        text: 'Votos recibidos',
        icon: 'expand_less',
        isError: true,
        errorMessage: 'n/d',
      },
      {
        number: 15,
        text: 'Favoritos guardados',
        icon: 'favorite',
        isError: true,
        errorMessage: 'n/d',
      },
    ]

    render(
      <CardProfile
        userData={{
          profilePicture: '/test-img.jpg',
          profilePictureAlt: 'No user image',
          userName: 'test-name',
          userEmail: 'test@test.com',
        }}
        counterData={counterData}
        logoutData={{
          logoutIcon: { name: 'power_settings_new' },
          handleLogOut: mockLogOut,
          logoutMsg: 'Logout',
        }}
      />
    )

    const notAvailableTexts = screen.getAllByText('n/d')
    expect(notAvailableTexts).toHaveLength(3)

    expect(screen.queryByText(3)).not.toBeInTheDocument()
    expect(screen.getByText(/aportaciones/i)).toBeInTheDocument()

    expect(screen.queryByText(23)).not.toBeInTheDocument()
    expect(screen.getByText(/votos recibidos/i)).toBeInTheDocument()

    expect(screen.queryByText(15)).not.toBeInTheDocument()
    expect(screen.getByText(/favoritos guardados/i)).toBeInTheDocument()
  })
})
