import styled from 'styled-components'
import { FlexBox, colors, dimensions } from '../../styles'
import { ResourceTitleLink } from '../molecules/ResourceTitleLink'
import EditResource from './EditResource'
import { TCardResource } from './CardResource'

const CardContainerStyled = styled(FlexBox)`
  background-color: ${colors.white};
  width: 100%;
  min-width: 17rem;
  position: relative;
  margin-top: ${dimensions.spacing.xxs};
  
`

export const CardResourceLink = ({ editable, ...rest }: TCardResource) => (
  <CardContainerStyled
    data-testid="resource-card"
    direction="row"
    align="center"
    justify="flex-start"
    {...rest}
  >
    {editable && (
      <EditResource
        {...rest}
        resourceType={rest.resourceType}
        topics={rest.topics}
      />
    )}
    <ResourceTitleLink {...rest} />
  </CardContainerStyled>
)
