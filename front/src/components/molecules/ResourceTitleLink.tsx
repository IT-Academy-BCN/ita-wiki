import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Text } from '../atoms'
import { colors } from '../../styles'

const LinkStyled = styled(Link)`
  text-decoration: none;

  ${Text} {
    margin: 0rem;
    margin-top: 5px;
  }
`

type TResourceTitleLink = {
  description: string
  title: string
  url: string
}

const ResourceTitleLink = ({ description, title, url }: TResourceTitleLink) => (
  <LinkStyled to={url} target="_blank" rel="noopener noreferrer">
    <Text fontWeight="bold">{title}</Text>
    <Text fontSize="small" color={colors.gray.gray3}>
      {description}
    </Text>
  </LinkStyled>
)

export { ResourceTitleLink }
