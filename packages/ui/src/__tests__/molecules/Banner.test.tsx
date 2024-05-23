import { screen, render, fireEvent } from '@testing-library/react'
import { Banner } from '../../components/molecules'
import { vi } from 'vitest'

const mockClick = vi.fn()

describe('Banner', () => {
  it('renders correctly and button can be clicked', () => {
    render(
      <Banner
        title="Banner title"
        description="Fake text for banner description"
        buttonText="Accept"
        imgUrl="https://picsum.photos/200"
        imgAltText="Alt text for img"
        onClick={mockClick}
      />
    )

    expect(screen.getByText('Banner title')).toBeInTheDocument()
    expect(
      screen.getByText('Fake text for banner description')
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Accept' })).toBeInTheDocument()
    const image: HTMLImageElement = screen.getByRole('img')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', 'https://picsum.photos/200')
    expect(image).toHaveAttribute('alt', 'Alt text for img')
    fireEvent.click(screen.getByTestId('button'))
    expect(mockClick).toHaveBeenCalled()
  })

  it('renders placeholder image and alt attribute when not provided', () => {
    render(
      <Banner
        title="No image title"
        description="Fake text for a banner without image"
        buttonText="Accept"
        onClick={mockClick}
      />
    )

    const defaultImage: HTMLImageElement = screen.getByRole('img')
    expect(defaultImage).toBeInTheDocument()
    expect(defaultImage).toHaveAttribute(
      'src',
      '/src/components/molecules/Banner/defaultImg.svg'
    )
    expect(defaultImage).toHaveAttribute('alt', 'e-book')
  })
})
