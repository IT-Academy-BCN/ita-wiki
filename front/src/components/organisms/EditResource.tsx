import { useState } from 'react'
import styled from 'styled-components'
import { useQuery } from '@tanstack/react-query'
import { FlexBox, colors, dimensions } from '../../styles'
import ResourceForm from './ResourceForm'
import { Button } from '../atoms'
import icons from '../../assets/icons'
import { urls } from '../../constants'
import { useGetTopics } from '../../hooks'
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
  isInCardResource?: boolean
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

const StyledSvg = styled.div<{ isInCardResource: boolean }>`
  position: ${(props) => (props.isInCardResource ? 'relative' : 'absolute')};
  top: ${(props) => (props.isInCardResource ? '1px' : '4px')};
  right: ${(props) => (props.isInCardResource ? '0' : '6px')};
  background-color: ${(props) =>
    props.isInCardResource ? 'transparent' : 'rgba(255, 255, 255, 0.5)'};
  padding: ${(props) => (props.isInCardResource ? '1px' : '2px')};

  > img {
    cursor: pointer;
  }
`

const EditResource = ({
  description,
  id,
  title,
  url,
  resourceType,
  topics,
  isInCardResource = false,
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

  //const { data, isLoading, isError } = useGetTopics(slug)

  // @@COM és POSSIBLE UQE FACI UN GET DE TOPICS SENSE ESPECIFICAR l'SLUG?? PER TESTEAJR-HO, CAL PODER CREAR RECURS D'UNA ALTRA CATEGORIA I VEURE SI CARREGA NOMÉS ELS SEUS TOPICS

  const mappedTopics =
    fetchedTopics?.map((topic: TMappedTopics) => ({
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
      <StyledSvg onClick={openModal} isInCardResource={isInCardResource}>
        <img src={icons.editPen} alt="Editar recurso" data-testid="edit-icon" />
      </StyledSvg>
    </>
  )
}
export default EditResource
