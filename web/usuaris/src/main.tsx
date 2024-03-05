import ReactDOM from 'react-dom/client'
import 'modern-normalize/modern-normalize.css'
import { createGlobalStyle } from 'styled-components'
import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { font } from '@itacademy/ui'
import { paths } from './constants/paths'
import { ErrorPage, Home } from './pages'
import { Layout } from './components/layout'
import './i18n'

const GlobalStyle = createGlobalStyle`
  body {
    font-family: ${font.fontFamily};
  }
`
const router = createBrowserRouter([
  {
    path: paths.home,
    element: <Home />,
    errorElement: <ErrorPage />,
  },
])

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Layout>
        <GlobalStyle />
        <RouterProvider router={router} />
      </Layout>
    </QueryClientProvider>
  </React.StrictMode>
)
