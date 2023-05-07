import ReactDOM from 'react-dom/client'
import 'modern-normalize/modern-normalize.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { paths } from './constants'
import { Home, Login, Register, ErrorPage, Resource } from './pages'
import { Information } from './pages/Information'
import { AddResource } from './pages/AddResource'
import { AuthProvider } from './context/AuthProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const router = createBrowserRouter([
  {
    path: paths.home,
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: paths.login,
    element: <Login />,
  },
  {
    path: paths.register,
    element: <Register />,
  },
  {
    path: paths.resource,
    element: <Resource />,
  },
  {
    path: paths.information,
    element: <Information />,
  },
  {
    path: 'add-resource',
    element: <AddResource />,
  },
])

// Create a client
const queryClient = new QueryClient()

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Failed to find the root element')
const root = ReactDOM.createRoot(rootElement)
root.render(
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  </AuthProvider>
)
