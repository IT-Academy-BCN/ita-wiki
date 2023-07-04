import { useState } from 'react'
import styled from 'styled-components'
import { FlexBox, colors, dimensions } from '../../styles'
import { Button, Text } from '../atoms'
import { CreateAuthor } from './CreateAuthor'
import { ResourceTitleLink } from './ResourceTitleLink'
import { VoteCounter } from './VoteCounter'
import icons from '../../assets/icons'
// eslint-disable-next-line import/no-cycle
import { ResourceForm } from '../organisms'
import { Modal } from './Modal'

const CardContainerStyled = styled(FlexBox)`
  border-radius: ${dimensions.borderRadius.sm};
  border: 1px solid ${colors.gray.gray3};
  height: 7rem;
  margin: ${dimensions.spacing.xxxs} auto;
  padding: 0.8rem 0.6rem 0.6rem 0.2rem;
  width: 100%;
  min-width: 15rem;
  position: relative;
`

const StyledSvg = styled.div`
  position: absolute;
  top: ${dimensions.spacing.xxs};
  right: ${dimensions.spacing.xxs};
  padding: 2px;
  background-color: rgba(255, 255, 255, 0.5);
`

const CounterContainerStyled = styled(FlexBox)`
  margin: 0 ${dimensions.spacing.xs};
  align-self: flex-start;

  ${Text} {
    margin: 0rem;
  }
`

const FlexBoxStyled = styled(FlexBox)`
  height: 100%;

  ${FlexBox} {
    gap: 2px;
  }

  ${Text} {
    margin: 0rem;
    margin-top: 2px;
  }
`
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
type TCardResource = {
  createdBy: string
  createdOn: string
  description: string
  img: string | undefined
  id: string
  likes: number
  title: string
  updatedOn?: string
  url: string
  editable: boolean
  handleAccessModal: () => void
}
type TMappedTopics = {
  id: string
  name: string
}
type TResourceForm = {
  title: string
  description: string
  url: string
  topics: string[]
  resourceType: string
  userEmail?: string
}
const initialValues = {
  title: '',
  url: '',
  topics: [], // Valor por defecto para 'topics' como un arreglo vacío
  resourceType: '',
  description: '',
  userEmail: '',
}
export const CardResource = ({
  createdBy,
  createdOn,
  description,
  img,
  likes,
  id,
  title,
  updatedOn,
  url,
  editable,
  handleAccessModal,
  ...rest
}: TCardResource) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [currentResource, setCurrentResource] = useState<TResourceForm>()
  const openModal = () => {
    setCurrentResource(currentResource ?? initialValues)
    setIsModalOpen(true)
  }
  // // Declaración e inicialización de la variable fetchedTopics
  const fetchedTopics = {
    topics: [
      { id: '1', name: 'Topic 1' },
      { id: '2', name: 'Topic 2' },
      { id: '3', name: 'Topic 3' },
    ],
  }

  // Código adicional utilizando fetchedTopics
  const mappedTopics =
    fetchedTopics?.topics?.map((topic: TMappedTopics) => {
      const selectOptions = { value: topic.id, label: topic.name }
      return selectOptions
    }) ?? []
  return (
    <CardContainerStyled
      direction="row"
      align="center"
      justify="flex-start"
      id={id}
      {...rest}
    >
      {editable && (
        <>
          <StyledSvg onClick={openModal} style={{ cursor: 'pointer' }}>
            <img src={icons.editPen} alt="Editar recurso" />
          </StyledSvg>
          <Modal
            isOpen={isModalOpen}
            toggleModal={() => setIsModalOpen(false)}
            title="Editar Recurso"
          >
            <ResourceForm
              selectOptions={mappedTopics}
              initialValues={currentResource || initialValues}
            />
            <ButtonContainerStyled>
              <ButtonStyled outline onClick={() => setIsModalOpen(false)}>
                Eliminar
              </ButtonStyled>
            </ButtonContainerStyled>
          </Modal>
        </>
      )}
      <CounterContainerStyled>
        <VoteCounter
          voteCount={likes}
          resourceId={id}
          handleAccessModal={handleAccessModal}
        />
      </CounterContainerStyled>
      <FlexBoxStyled align="start" justify="space-between" gap="4px">
        <ResourceTitleLink description={description} title={title} url={url} />
        <CreateAuthor createdBy={createdBy} createdOn={createdOn} img={img} />
      </FlexBoxStyled>
    </CardContainerStyled>
  )
}
