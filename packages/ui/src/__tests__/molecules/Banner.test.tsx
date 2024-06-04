import { vi } from 'vitest'
import { screen, render, fireEvent } from '@testing-library/react'
import { Banner } from '../../components/molecules'

const mockClick = vi.fn()

describe('Banner', () => {
  it('renders correctly and button can be clicked', () => {
    render(
      <Banner
        id="1"
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

  it('renders default props when not provided', () => {
    render(
      <Banner
        id="2"
        title="No image title"
        description="Fake text for a banner without image"
        buttonText="Accept"
        imgAltText="fake-alt-text"
        onClick={mockClick}
      />
    )
    const banner = screen.getByTestId('baner-2')
    const defaultImage: HTMLImageElement = screen.getByRole('img')
    expect(defaultImage).toBeInTheDocument()
    expect(banner).toHaveStyle('width: 34.65rem')
    expect(defaultImage).toHaveAttribute(
      'src',
      '/src/components/molecules/Banner/defaultImg.svg'
    )
  })

  it('renders small banner when size is small', () => {
    render(
      <Banner
        id="3"
        title="Banner title"
        description="Fake text for banner description"
        buttonText="Accept"
        imgUrl="https://picsum.photos/200"
        imgAltText="Alt text for img"
        onClick={mockClick}
        size="small"
      />
    )
    const banner = screen.getByTestId('baner-3')
    expect(banner).toHaveStyle('width: 24.5rem')
  })
})
