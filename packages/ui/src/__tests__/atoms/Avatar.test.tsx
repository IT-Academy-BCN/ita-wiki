import { render, screen } from '@testing-library/react'
import { Avatar } from '../../components/atoms/Avatar'

describe('Avatar', () => {
  it('should render with given props', () => {
    render(<Avatar src="/test.png" alt="users portrait" onClick={() => null} width={40} height={40} borderRadius="" />)

    const image: HTMLImageElement = screen.getByRole('img')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', '/test.png')
    expect(image).toHaveAttribute('alt', 'users portrait')
  })
})
