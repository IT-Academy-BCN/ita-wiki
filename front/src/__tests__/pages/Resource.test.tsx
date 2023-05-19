import { fireEvent, screen } from '@testing-library/react'
import { render } from '../test-utils'
import { Resource } from '../../pages'

describe('Resource', () => {
  it('renders correctly', () => {
    render(<Resource />)

    expect(screen.getByText(/temas/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '+' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Cursos' })).toBeInTheDocument()
  })

  it('modal opens and closes correctly', () => {
    render(<Resource />)

    fireEvent.click(screen.getByRole('button', { name: /\+/i }))

    const modalTitle = screen.getByRole('heading', { name: /nuevo recurso/i })

    expect(modalTitle).toBeInTheDocument()

    fireEvent.keyDown(document, { key: 'Escape' })

    expect(modalTitle).not.toBeInTheDocument()
  })
})
