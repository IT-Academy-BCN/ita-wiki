import { FC } from 'react'
import styled from 'styled-components'
import { colors, dimensions, font } from '../../styles'
import { TLink } from '../../types'

const StyledLink = styled.a<TLink>`
  /* margin: ${dimensions.spacing.xxs}; */
  gap: ${dimensions.spacing.xxs};
  cursor: pointer;
  color: ${colors.black};
  font-weight: ${({ weight }: { weight?: 'bold' | 'regular' | string }) =>
    weight === 'bold' ? font.bold : font.regular};
  font-family: ${font.fontFamily};
`

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
