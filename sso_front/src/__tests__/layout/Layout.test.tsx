import { render, screen } from '@testing-library/react'
import { Layout } from '../../components/layout'

describe('Layout', () => {
  it('renders correcty', () => {
    render(<Layout>Test</Layout>)

    const layout = screen.getByText('Test')
    expect(layout).toBeInTheDocument()
  })
})
