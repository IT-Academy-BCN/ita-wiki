import { render, screen } from '@testing-library/react'
import { RouterProvider, createMemoryRouter } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'
import { font } from '@itacademy/ui'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './setup'
import { ErrorPage, Home } from '../pages'
import { Layout } from '../components/layout'
import { AuthProvider } from '../context/AuthProvider'

describe('main', () => {
  it('renders correctly', () => {
    const GlobalStyle = createGlobalStyle`
      body {
        font-family: ${font.fontFamily};
      }
    `

    const routes = [
      {
        path: '/',
        element: <Home />,
        errorElement: <ErrorPage />,
      },
    ]

    const router = createMemoryRouter(routes, {
      initialEntries: ['/'],
    })

    render(
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <Layout>
            <GlobalStyle />
            <RouterProvider router={router} />
          </Layout>
        </QueryClientProvider>
      </AuthProvider>
    )

    const navBarElement = screen.getByText(/ES/i)
    const ITALogo = screen.getByAltText(/IT Academy/i)

    expect(navBarElement).toBeInTheDocument()
    expect(ITALogo).toBeInTheDocument()
  })
})
