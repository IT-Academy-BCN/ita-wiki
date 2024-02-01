import ReactDOM from 'react-dom/client'
import 'modern-normalize/modern-normalize.css'
import { createGlobalStyle } from 'styled-components'
import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { font } from './styles'
import { paths } from './constants/paths'
import { ErrorPage, Home } from './pages'
import { Layout } from './components/layout'

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

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Layout>
      <GlobalStyle />
      <RouterProvider router={router} />
    </Layout>
  </React.StrictMode>
)
