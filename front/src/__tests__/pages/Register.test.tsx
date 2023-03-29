import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { Register } from '../../pages'

describe('Register', () => {
  it('Register renders correctly', () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    )
    expect(screen.getByText(/Registrarme/i)).toBeInTheDocument()
  })
})
