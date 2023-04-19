import styled from 'styled-components'
import { FlexBox, dimensions } from '../../styles'
import { Title } from '../atoms'
import { CardResourceHome } from '../molecules'

type Tresource = {
  title: string
  createdBy: string
  createdOn: string
  description: string
}

type Tresources = {
  title: string
  resources: Tresource[]
}
const ResourcesList = ({ title, resources }: Tresources) => {
  const TitleStyled = styled(Title)`
    padding-left: ${dimensions.spacing.lg};
  `

  const FlexBoxStyled = styled(FlexBox)`
    padding-left: ${dimensions.spacing.lg};
    justify-content: flex-start;
    gap: 1rem;
    overflow: hidden;
    overflow-x: auto;
    &::-webkit-scrollbar {
      display: none;
    }
  `

  return (
    <>
      <TitleStyled as="h3" fontWeight="bold">
        {title}
      </TitleStyled>
      <FlexBoxStyled direction="row">
        {resources.map((resource) => (
          <CardResourceHome
            title={resource.title}
            createdBy={resource.createdBy}
            createdOn={resource.createdOn}
            description={resource.description}
          />
        ))}
      </FlexBoxStyled>
    </>
  )
}

export { ResourcesList }
