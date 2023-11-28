import styled from 'styled-components'
import { FlexBox, colors, device, dimensions } from '../../styles'
import { ResourceTitleLink } from '../molecules/ResourceTitleLink'
import EditResource from './EditResource'
import { TCardResource } from '../../types'

const CardContainerStyled = styled(FlexBox)`
  width: 100%;
  margin-top: ${dimensions.spacing.xxs};
`

export const CardResourceLink = ({ editable, ...rest }: TCardResource) => (
  <CardContainerStyled
    data-testid="resource-card"
    direction="row"
    align="start"
    justify="space-between"
    {...rest}
  >
    <ResourceTitleLink {...rest} />
    {editable && (
      <EditResource
        {...rest}
        resourceType={rest.resourceType}
        topics={rest.topics}
      />
    )}
  </CardContainerStyled>
)
