import { vi } from 'vitest'
import { Banner } from '@itacademy/ui'
import { render, screen } from '../test-utils'
import { TAuthContext, useAuth } from '../../context/AuthProvider'
import { Home } from '../../pages'

describe('Home page', () => {
  beforeEach(() => {
    vi.mock('../../context/AuthProvider', async () => {
      const actual = await vi.importActual('../../context/AuthProvider')
      return {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        ...actual,
        useAuth: vi.fn(),
      }
    })
  })

  it('Renders correctly', () => {
    vi.mocked(useAuth).mockReturnValue({
      user: {
        name: 'Hola',
        avatarId: 'Adios',
      },
    } as TAuthContext)
    render(<Home />)

    expect(screen.getByText(/Vota els recursos/i)).toBeInTheDocument()
    expect(
      screen.getByText(/Et donem la benvinguda a la wiki de la IT Academy!/)
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        /Funcionalitats bàsiques que t'ofereix aquesta plataforma:/
      )
    ).toBeInTheDocument()
  })

  it('shows signup button if user is not logged in', () => {
    vi.mocked(useAuth).mockReturnValue({
      user: null,
    } as TAuthContext)
    render(<Home />)

    expect(screen.getByText(/entrar/i)).toBeInTheDocument()
  })

  it('does not show signup button if user is logged in', () => {
    vi.mocked(useAuth).mockReturnValue({
      user: {
        name: 'Hola',
        avatarId: 'Adios',
      },
    } as TAuthContext)
    render(<Home />)

    expect(screen.queryByText(/registrarme/i)).not.toBeInTheDocument()
  })

  it('shows banners', () => {
    const mockedBanner = {
      title: 'ITAcademy',
      description: 'Aprende a programar en 18 semanas y reprograma tu futuro',
      url: 'https://images.unsplash.com/photo-1601467295274-f2408b6e90f2?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    }

    render(
      <Banner
        key={mockedBanner.title}
        title={mockedBanner.title}
        description={mockedBanner.description}
        imgUrl={mockedBanner.url}
        buttonText="Acceptar"
        onClick={() => {}}
      />
    )
    expect(screen.getByText(/Aprende a programar/i)).toBeInTheDocument()
  })
})
