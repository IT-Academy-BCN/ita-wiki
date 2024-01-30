import { FC, HTMLAttributes } from 'react'
import styled from 'styled-components'
import { colors, font } from '../../styles'

const StyledLink = styled.a.withConfig<TLink>({
  shouldForwardProp: (prop) => !['weight'].includes(prop),
})`
  cursor: pointer;
  color: ${colors.black};
  font-weight: ${({ weight }: { weight?: 'bold' | 'regular' }) =>
    weight === 'bold' ? font.bold : font.regular};
  font-family: ${font.fontFamily};
`
type TLink = HTMLAttributes<HTMLAnchorElement> & {
  weight?: 'bold' | 'regular'
  href: string
  children?: React.ReactNode
}
export const Link: FC<TLink> = ({
  weight = 'regular',
  href = '/',
  children,
  ...rest
}) => (
  <StyledLink data-testid="link" weight={weight} href={href} {...rest}>
    {children}
  </StyledLink>
)
