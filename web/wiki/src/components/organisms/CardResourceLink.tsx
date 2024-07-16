import styled from 'styled-components'
import { FlexBox, ResourceTitleLink, dimensions } from '@itacademy/ui'
import { EditResource } from './EditResource'
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

export const CardResourceLink = ({
  editable,
  description,
  ...rest
}: TCardResource) => (
  <CardContainerStyled
    data-testid="resource-card"
    direction="row"
    align="start"
    justify="space-between"
    {...rest}
  >
    {description && <ResourceTitleLink {...rest} description={description} />}
    {editable && description && (
      <EditResource
        {...rest}
        description={description}
        resourceType={rest.resourceType}
        topics={rest.topics}
      />
    )}
  </CardContainerStyled>
)
