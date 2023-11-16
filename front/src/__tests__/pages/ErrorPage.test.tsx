import { RouterProvider, createMemoryRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { ErrorPage } from '../../pages'

describe('ErrorPage', () => {
  it('render ErrorPage if the path does not exist', () => {
    const routes = [
      {
        path: '/',
        element: <p>some text</p>,
        errorElement: <ErrorPage />,
      },
    ]
    const router = createMemoryRouter(routes, {
      initialEntries: ['/asdfiohawefasdlkfjasd'],
    })

    render(<RouterProvider router={router} />)

    expect(screen.getByText(/page not found/i)).toBeInTheDocument()
  })
})
