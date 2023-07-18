import { useState } from 'react'
import styled from 'styled-components'
import { useQuery } from '@tanstack/react-query'
import { FlexBox, colors, dimensions } from '../../styles'
import ResourceForm from './ResourceForm'
import { Button } from '../atoms'
import icons from '../../assets/icons'
import { urls } from '../../constants'
import { Modal } from '../molecules/Modal'

type TTopic = {
  topic: {
    id: string
    name: string
    slug: string
    categoryId: string
    createdAt: string
    updatedAt: string
  }
}
type TEditResourceProps = {
  description: string
  id: string
  title: string
  url: string
  resourceType: string
  topics: TTopic[]
}
type TMappedTopics = {
  id: string
  name: string
}
const ButtonContainerStyled = styled(FlexBox)`
  gap: ${dimensions.spacing.xs};
  margin: ${dimensions.spacing.xs} 0;
`
const ButtonStyled = styled(Button)`
  font-weight: 500;
  margin: ${dimensions.spacing.xxxs} ${dimensions.spacing.xl};
  color: ${({ outline }) =>
    outline ? `${colors.gray.gray3}` : `${colors.white}`};
`
const StyledSvg = styled.div`
  position: absolute;
  top: ${dimensions.spacing.xxs};
  right: ${dimensions.spacing.xxs};
  padding: 2px;
  background-color: rgba(255, 255, 255, 0.5);
`
const EditResource = ({
  description,
  id,
  title,
  url,
  resourceType,
  topics,
}: TEditResourceProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const openModal = () => {
    setIsModalOpen(true)
  }
  const getTopics = async () => {
    const response = await fetch(urls.getTopics)
    const data = await response.json()
    return data
  }
  const { data: fetchedTopics } = useQuery(['getTopics'], getTopics)

  const mappedTopics =
    fetchedTopics?.topics?.map((topic: TMappedTopics) => ({
      value: topic.id,
      label: topic.name,
    })) ?? []
  const initialTopicId = topics && topics.length > 0 ? topics[0].topic.id : ''

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        toggleModal={() => setIsModalOpen(false)}
        title="Editar Recurso"
        data-testid="modal"
      >
        <ResourceForm
          selectOptions={mappedTopics}
          initialValues={{
            id,
            title,
            description,
            url,
            resourceType,
            topicId: initialTopicId,
          }}
          resourceId={id}
        />
        <ButtonContainerStyled>
          <ButtonStyled outline>Eliminar</ButtonStyled>
        </ButtonContainerStyled>
      </Modal>
      <StyledSvg onClick={openModal} style={{ cursor: 'pointer' }}>
        <img src={icons.editPen} alt="Editar recurso" data-testid="edit-icon" />
      </StyledSvg>
    </>
  )
}
export default EditResource
