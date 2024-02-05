import { render, screen } from '@testing-library/react'
import { RouterProvider, createMemoryRouter } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'
import { font } from '@itacademy/ui'
import { ErrorPage, Home } from '../pages'
import { Layout } from '../components/layout'

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
      <Layout>
        <GlobalStyle />
        <RouterProvider router={router} />
      </Layout>
    )

    const HomeElement = screen.getByText('Home Front SSO')
    expect(HomeElement).toBeInTheDocument()
  })
})
