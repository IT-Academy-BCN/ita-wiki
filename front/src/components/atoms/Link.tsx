import { HTMLAttributes, FC } from 'react'
import styled from 'styled-components'
import { colors, dimensions, font } from '../../styles'

const StyledLink = styled.a<TLink>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: ${dimensions.spacing.xxs};
  cursor: pointer;
  color: ${colors.black};
  font-weight: ${({ weight }: { weight?: 'bold' | 'regular' | string }) =>
    weight === 'bold' ? font.bold : font.regular};
  font-family: ${font.fontFamily};
`

type TLink = HTMLAttributes<HTMLAnchorElement> & {
  weight?: 'bold' | 'regular'
  href: string
  children?: React.ReactNode
}

const Link: FC<TLink> = ({
  weight = 'regular',
  href = '/',
  children,
  ...rest
}) => (
  <StyledLink data-testid="link" weight={weight} href={href} {...rest}>
    {children}
  </StyledLink>
)

export default styled(Link)``
