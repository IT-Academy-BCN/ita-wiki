import { render, screen } from '@testing-library/react'
import { HowToHelpCard } from '../../components/organisms/HowToHelpCard'
import { BrowserRouter } from 'react-router-dom'

describe('HowToHelpCard', () => {
  it('renders correctly', () => {
    render(
      <BrowserRouter>
        <HowToHelpCard />
      </BrowserRouter>
    )

    expect(screen.getByRole('img')).toBeInTheDocument()
    expect(screen.getByAltText('new folder')).toBeInTheDocument()
    expect(screen.getByText('¿Cómo colaborar en la wiki?')).toBeInTheDocument()
  })
})
