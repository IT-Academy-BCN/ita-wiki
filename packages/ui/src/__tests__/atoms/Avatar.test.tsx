import { fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { Avatar } from '../../components/atoms/Avatar'

const mockClick = vi.fn()
const defaultAvatarCss = {
  width: '97px',
  height: '97px',
  borderRadius: '50%',
}
describe('Avatar', () => {
  it('should render with default props', () => {
    render(<Avatar src="/test.png" alt="users portrait" />)

    const image: HTMLImageElement = screen.getByRole('img')

    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', '/test.png')
    expect(image).toHaveAttribute('alt', 'users portrait')

  })
  it('should render with given props', () => {
    render(<Avatar src="/test.png" alt="users portrait" avatarCss={defaultAvatarCss} onClick={mockClick} />)

    const image: HTMLImageElement = screen.getByRole('img')

    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', '/test.png')
    expect(image).toHaveAttribute('alt', 'users portrait')
   
    expect(image).toHaveStyle('width: 97px; height: 97px; border-radius: 50%;');
    expect(image).toHaveStyle('cursor: pointer;');

    fireEvent.click(image)
    expect(mockClick).toHaveBeenCalled()

  })

})
