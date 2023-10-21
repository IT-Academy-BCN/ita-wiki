import { vi } from 'vitest'
import { render, screen, waitFor, fireEvent } from '../test-utils'
import { TAuthContext, useAuth } from '../../context/AuthProvider'
import { SettingsManager } from '../../components/organisms'


beforeEach(() => {
  vi.mock('../../context/AuthProvider', async () => {
    const actual: Record<number, unknown> = await vi.importActual(
      '../../context/AuthProvider'
    )
    return {
      ...actual,
      useAuth: vi.fn(),
    }
  })
  vi.mocked(useAuth).mockReturnValue({
    user: {
      name: 'MentorName',
      avatar: 'MentorAvatar',
      role: 'MENTOR',
    },
  } as TAuthContext)
})

afterEach(() => {
  vi.resetAllMocks()
})

describe('SettingsManager component', () => {
  it('renders Temes and Usuaris tabs correctly for mentor roles or higher', () => {
    render(<SettingsManager />)

    expect(screen.getByText('Temes')).toBeInTheDocument()
    expect(screen.getByText('Usuaris')).toBeInTheDocument()
  })

  it('does not render Usuaris tab for registered users', () => {
    vi.mocked(useAuth).mockReturnValue({
      user: {
        name: 'Name',
        avatar: 'Avatar',
        role: 'REGISTERED',
      },
    } as TAuthContext)
    render(<SettingsManager />)
  
    expect(screen.getByText('Temes')).toBeInTheDocument()
    expect(screen.queryByText('Usuaris')).not.toBeInTheDocument()
  })

  it('changes content tab according to click on menu tab', async () => {
    render(<SettingsManager />)
  
    fireEvent.click(screen.getByText('Usuaris'))
  
    await waitFor(() => {
      expect(screen.getByText('Usuaris')).toBeInTheDocument()
    })
  
    expect(
      screen.queryByText(/No hi ha temes disponibles./)
    ).not.toBeInTheDocument()
    
    fireEvent.click(screen.getByText('Temes'))
  
    await waitFor(() => {
      expect(screen.getByText('Temes')).toBeInTheDocument();
    })
  
    expect(screen.queryByText('Users Manager')).not.toBeInTheDocument();
  })

  it('allows admin roles to edit users', async () => {
    vi.mocked(useAuth).mockReturnValue({
      user: {
        name: 'AdminName',
        avatar: 'AdminAvatar',
        role: 'ADMIN',
      },
    } as TAuthContext);
    render(<SettingsManager />)
  
    fireEvent.click(screen.getByText('Usuaris'));
  
    await waitFor(() => {
      expect(screen.getByText('Users Manager')).toBeInTheDocument();
    })
  })
})
