import ReactDOM from 'react-dom/client'
// eslint-disable-next-line import/no-extraneous-dependencies
import 'modern-normalize/modern-normalize.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { paths } from './constants'
import { Home, Login, Register, ErrorPage } from './pages'
import { AddResource } from './pages/AddResource'

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
    path: 'add-resource',
    element: <AddResource />,
  },
])

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Failed to find the root element')
const root = ReactDOM.createRoot(rootElement)
root.render(<RouterProvider router={router} />)
