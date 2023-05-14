import styled from 'styled-components'
import { render } from '@testing-library/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import { queryClient } from '../setup'
import { Home } from '../../pages'
import { device } from '../../styles'
import { resources } from '../../pages/Home'

describe('Test HomePage', () => {
  it('renders correctly', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </QueryClientProvider>
    )
  })

  describe('MobileStyled component Media Query behaviour', () => {
    const MobileStyled = styled.div`
      display: block;
      @media only ${device.Laptop} {
        display: none;
      }
    `

    it('displays on Tablet and Mobile', () => {
      const { getByTestId } = render(
        <MobileStyled data-testid="mobile-styled" />
      )
      expect(getByTestId('mobile-styled')).toHaveStyle(`
      display: block;
    `)
    })

    it('hides on Laptop, Desktop and LaptopLg', () => {
      const { getByTestId } = render(
        <MobileStyled data-testid="mobile-styled" />
      )
      expect(getByTestId('mobile-styled')).toHaveStyle(`
      display: none;
    `)
    })
  })

  describe('DesktopStyled component Media Query behaviour', () => {
    const DesktopStyled = styled.div`
      display: none;
      @media only ${device.Laptop} {
        display: block;
      }
    `

    it('hides on Tablet and Mobile', () => {
      const { getByTestId } = render(
        <DesktopStyled data-testid="desktop-styled" />
      )
      expect(getByTestId('desktop-styled')).toHaveStyle(`
      display: none;
    `)
    })

    it('displays on Laptop, Desktop and LaptopLg', () => {
      const { getByTestId } = render(
        <DesktopStyled data-testid="desktop-styled" />
      )
      expect(getByTestId('desktop-styled')).toHaveStyle(`
      display: block;
    `)
    })
  })

  describe('Test HomePage', () => {
    it('renders filteredItems', () => {
      const { getByText } = render(
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Home />
          </BrowserRouter>
        </QueryClientProvider>
      )
      const filteredItems = resources.filter((resource) =>
        resource.title.toLowerCase().includes('javascript')
      )
      expect(filteredItems).toBeInTheDocument()
      filteredItems.forEach((resource) =>
        expect(getByText(resource.title)).toBeInTheDocument()
      )
    })
  })

})
