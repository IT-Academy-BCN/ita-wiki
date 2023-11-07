import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { Text } from '../atoms'
import { colors, dimensions, font } from '../../styles'
import { TResourceTitleLink } from '../../types'
import { useAuth } from '../../context/AuthProvider'
import { updateStatus } from '../../helpers/fetchers'

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

const ResourceTitleLink = ({
  description,
  title,
  url,
  id,
}: TResourceTitleLink) => {
  const { user } = useAuth()

  const statusMutation = useMutation({
    mutationFn: updateStatus,
  })

  const handleClick = async () => {
    if (!user) return

    statusMutation.mutate(id)
  }

  return (
    <LinkStyled
      to={url}
      target="_blank"
      rel="noopener noreferrer"
      data-testid="resource-title"
      onClick={handleClick}
    >
      <Text fontWeight="bold">{title}</Text>
      <Description>{description}</Description>
    </LinkStyled>
  )
}
export { ResourceTitleLink }
