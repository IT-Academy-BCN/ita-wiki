import ReactDOM from 'react-dom/client'
import 'modern-normalize/modern-normalize.css'
import { createGlobalStyle } from 'styled-components'
import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { font } from '@itacademy/ui'
import { paths } from './constants/paths'
import { ErrorPage, Home, Mentors } from './pages'
import './i18n'
import { AuthProvider } from './context/AuthProvider'

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
  {
    path: paths.mentors,
    element: <Mentors />,
  },
])

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
)
