import ReactDOM from 'react-dom/client'
import 'modern-normalize/modern-normalize.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { paths } from './constants'
import {
  Home,
  Login,
  Register,
  ErrorPage,
  Resource,
  HomeDesktop,
} from './pages'
import { Information } from './pages/Information'
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
  {
    path: paths.homedesktop,
    element: <HomeDesktop />,
  },
])

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Failed to find the root element')
const root = ReactDOM.createRoot(rootElement)
root.render(<RouterProvider router={router} />)
