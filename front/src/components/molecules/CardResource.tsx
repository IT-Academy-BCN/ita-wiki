import { useState } from 'react'
import styled from 'styled-components'
import { useQuery } from '@tanstack/react-query'
import { FlexBox, colors, dimensions } from '../../styles'
import { Button, Text } from '../atoms'
import { CreateAuthor } from './CreateAuthor'
import { ResourceTitleLink } from './ResourceTitleLink'
import { VoteCounter } from './VoteCounter'
import icons from '../../assets/icons'
// eslint-disable-next-line import/no-cycle
import { ResourceForm } from '../organisms'
import { Modal } from './Modal'
import { urls } from '../../constants'

const CardContainerStyled = styled(FlexBox)`
  background-color: ${colors.white};
  border-radius: ${dimensions.borderRadius.sm};
  border: 1px solid ${colors.gray.gray4};
  height: 7rem;
  padding: ${dimensions.spacing.xxs} ${dimensions.spacing.xs};
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
export type TCardResource = {
  createdBy: string
  createdAt: string
  description: string
  img: string | undefined
  id: string
  likes?: number
  title: string
  updatedAt: string
  url: string
  resourceType: string
  topics: TTopic[]
  editable: boolean
  handleAccessModal: () => void
}

type TMappedTopics = {
  id: string
  name: string
}

export const CardResource = ({
  createdBy,
  createdAt,
  description,
  img,
  likes,
  id,
  title,
  updatedAt,
  url,
  editable,
  resourceType,
  topics,
  handleAccessModal,
  ...rest
}: TCardResource) => {
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
    <CardContainerStyled
      data-testid="resource-card"
      direction="row"
      align="center"
      justify="flex-start"
      id={id}
      {...rest}
    >
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
          <ButtonStyled outline onClick={() => setIsModalOpen(false)}>
            Eliminar
          </ButtonStyled>
        </ButtonContainerStyled>
      </Modal>
      {editable && (
        <StyledSvg onClick={openModal} style={{ cursor: 'pointer' }}>
          <img
            src={icons.editPen}
            alt="Editar recurso"
            data-testid="edit-icon"
          />
        </StyledSvg>
      )}
      {Number.isInteger(likes) && (
        <CounterContainerStyled>
          <VoteCounter
            voteCount={likes || 0}
            resourceId={id}
            handleAccessModal={handleAccessModal || undefined}
          />
        </CounterContainerStyled>
      )}
      <FlexBoxStyled align="start" justify="space-between" gap="4px">
        <ResourceTitleLink description={description} title={title} url={url} />
        <CreateAuthor createdBy={createdBy} updatedAt={updatedAt} img={img} />
      </FlexBoxStyled>
    </CardContainerStyled>
  )
}
