import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Text } from '../atoms'
import { colors, device, dimensions, font } from '../../styles'

const LinkStyled = styled(Link)`
  text-decoration: none;
  margin-bottom: ${dimensions.spacing.xxs};
  height: ${dimensions.spacing.xxl};
  overflow: hidden auto;
  flex-basis:80%;

  ${Text} {
    margin: 0rem;
    margin-top: 5px;
  }

  @media only ${device.Tablet}{
    overflow: visible;
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
  <LinkStyled
    to={url}
    target="_blank"
    rel="noopener noreferrer"
    data-testid="resource-title"
  >
    <Text fontWeight="bold">{title}</Text>
    <Description>{description}</Description>
  </LinkStyled>
)

export { ResourceTitleLink }
