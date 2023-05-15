import styled from 'styled-components'
import { FlexBox, dimensions } from '../../styles'
import { Title } from '../atoms'
import { CardResource } from '../molecules'

type Tresource = {
  id: string
  title: string
  createdBy: string
  createdOn: string
  description: string
  img: string
  url: string
  likes: number
}

type Tresources = {
  title: string
  resources: Tresource[]
}
const TitleStyled = styled(Title)`
  padding-left: ${dimensions.spacing.lg};
`

const FlexBoxStyled = styled(FlexBox)`
  padding-left: ${dimensions.spacing.lg};
  justify-content: flex-start;
  gap: ${dimensions.spacing.base};
  overflow: hidden;
  overflow-x: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`

const ResourcesList = ({ title, resources }: Tresources) => (
  <>
    <TitleStyled as="h3" fontWeight="bold">
      {title}
    </TitleStyled>
    <FlexBoxStyled direction="row">
      {resources.map((resource) => (
        <CardResource
          key={resource.id}
          title={resource.title}
          description={resource.description}
          url={resource.url}
          img={resource.img}
          createdBy={resource.createdBy}
          createdOn={resource.createdOn}
          likes={resource.likes}
        />
      ))}
    </FlexBoxStyled>
  </>
)

export { ResourcesList }
