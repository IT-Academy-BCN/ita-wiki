import styled from 'styled-components'
import { FlexBox, dimensions } from '@itacademy/ui'
import { ResourceTitleLink } from '../molecules'
import EditResource from './EditResource'
import { TCardResource } from '../../types'

const CardContainerStyled = styled(FlexBox).withConfig({
  shouldForwardProp: (prop) =>
    ![
      'createdAt',
      'createdBy',
      'updatedAt',
      'handleAccessModal',
      'resourceType',
      'isFavorite',
    ].includes(prop),
})`
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
