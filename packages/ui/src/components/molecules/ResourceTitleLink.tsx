import { AnchorHTMLAttributes, FC } from 'react'
import styled from 'styled-components'
import { Text } from '../atoms'
import { colors, dimensions, font } from '../../styles'

const LinkStyled = styled.a`
  text-decoration: none;
  margin-bottom: ${dimensions.spacing.xxs};

  ${Text} {
    margin: 0rem;
    margin-top: 5px;
  }
`

const Description = styled(Text)`
  font-weight: ${font.medium};
  color: ${colors.gray.gray3};
`

export type TResourceTitleLink = AnchorHTMLAttributes<HTMLAnchorElement> & {
  description: string
  title: string
  url: string
  onClick?: () => void
}
export const ResourceTitleLink: FC<TResourceTitleLink> = ({
  description,
  title,
  url,
  onClick,
  ...rest
}) => (
  <LinkStyled
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    data-testid="resource-title"
    onClick={onClick}
    {...rest}
  >
    <Text fontWeight="bold">{title}</Text>
    <Description fontSize={font.xss}>{description}</Description>
  </LinkStyled>
)
