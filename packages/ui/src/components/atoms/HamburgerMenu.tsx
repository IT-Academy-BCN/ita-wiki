import { FC } from 'react'
import styled from 'styled-components'
import { colors, dimensions, device } from '../../styles'

export type THamburgerMenu = {
  open: boolean
  onClick: () => void
}

const StyledBurger = styled.button<THamburgerMenu>`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: ${({ open }) => (open ? '30' : '10')};
  margin: auto;
  margin-left: ${dimensions.spacing.xxs};
  &:focus {
    outline: none;
  }

  div {
    height: 0.2rem;
    background-color: ${colors.black.black1};
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;
    &:first-child {
      width: ${({ open }) => (open ? '2rem' : '1.5rem')};
      transform: ${({ open }) => (open ? 'rotate(45deg)' : 'rotate(0)')};
    }

    &:nth-child(2) {
      width: 2rem;
      opacity: ${({ open }) => (open ? '0' : '1')};
      transform: ${({ open }) => (open ? 'translateX(20px)' : 'translateX(0)')};
    }

    &:last-child {
      width: ${({ open }) => (open ? '2rem' : '1.5rem')};
      transform: ${({ open }) => (open ? 'rotate(-45deg)' : 'rotate(0)')};
    }
  }

  @media ${device.Tablet} {
    display: none;
  }
`

export const HamburgerMenu: FC<THamburgerMenu> = ({ open, onClick }) => (
  <StyledBurger open={open} onClick={onClick} data-testid="hamburger-menu">
    <div data-testid="hamburger-menu-item" />
    <div data-testid="hamburger-menu-item" />
    <div data-testid="hamburger-menu-item" />
  </StyledBurger>
)
