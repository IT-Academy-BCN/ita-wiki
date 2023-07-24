import { render, screen } from '@testing-library/react'
import UserImage from '../../components/atoms/UserImage'

describe('UserImage', () => {
  it('should render with given props', () => {
    render(
      <UserImage
        src='/test.png'
        alt='users portrait'
      />
    )

    const image: HTMLImageElement = screen.getByRole('img')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', '/test.png')
    expect(image).toHaveAttribute('alt', 'users portrait')
  })
})