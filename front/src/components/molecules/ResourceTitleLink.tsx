import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Text } from '../atoms'
import { colors, dimensions, font } from '../../styles'

const LinkStyled = styled(Link)`
  text-decoration: none;
  margin-bottom: ${dimensions.spacing.xxs};

  ${Text} {
    margin: 0rem;
    margin-top: 5px;
  }
`

const Description = styled(Text)`
  font-weight: ${font.medium};
  font-size: ${font.xss};
  color: ${colors.gray.gray3};
`

export type TResourceTitleLink = {
  description: string
  title: string
  url: string
}

const ResourceTitleLink = ({ description, title, url }: TResourceTitleLink) => (
  <LinkStyled to={url} target="_blank" rel="noopener noreferrer">
    <Text fontWeight="bold">{title}</Text>
    <Description>{description}</Description>
  </LinkStyled>
)

export { ResourceTitleLink }
