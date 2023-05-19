import { MemoryRouter, Routes, Route, useParams } from 'react-router'
import { fireEvent, screen, render } from '@testing-library/react'

//import { render } from '../test-utils'
import { Category } from '../../pages'

//https://github.com/remix-run/react-router/blob/v6.0.0-beta.0/packages/react-router/__tests__/useParams-test.js

describe('Category', () => {
  it('renders correctly', () => {
    let params
    const Category = () => {
      params = useParams()
      return null
    }
    render(
      <MemoryRouter initialEntries={['/slug']} state="slugState">
        <Category />
      </MemoryRouter>
    )

    expect(typeof params).toBe('object')
    expect(params).toMatchObject({
      slug: 'slug',
    })

    // expect(window.location).toEqual('/slug')
    //expect(screen.getByText(/votos/i)).toBeInTheDocument()
    //  expect(screen.getByRole('button', { name: '+' })).toBeInTheDocument()
    // expect(screen.getByRole('button', { name: 'Cursos' })).toBeInTheDocument()
  })

  it('modal opens and closes correctly', () => {
    render(
      <MemoryRouter initialEntries={['/slug']}>
        <Category />
      </MemoryRouter>
    )

    fireEvent.click(screen.getByRole('button', { name: /\+/i }))

    const modalTitle = screen.getByRole('heading', { name: /nuevo recurso/i })

    expect(modalTitle).toBeInTheDocument()

    fireEvent.keyDown(document, { key: 'Escape' })

    expect(modalTitle).not.toBeInTheDocument()
  })
})
