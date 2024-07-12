import styled from 'styled-components'
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { Button, FlexBox, Modal, colors, dimensions } from '@itacademy/ui'
import { ResourceForm } from './ResourceForm'
import icons from '../../assets/icons'
import { TEditResourceProps, TMappedTopics } from '../../types'
import { useListTopics } from '../../openapi/openapiComponents'

const ButtonContainerStyled = styled(FlexBox)`
  margin: ${dimensions.spacing.xs} 0;
`

const ButtonStyled = styled(Button)`
  font-weight: 500;
  margin: ${dimensions.spacing.xxxs} ${dimensions.spacing.xl};
  color: ${({ outline }) =>
    outline ? `${colors.gray.gray3}` : `${colors.white}`};
`

const StyledSvg = styled.div<{ isInCardResource: boolean }>`
  position: relative;
  top: ${(props) => (props.isInCardResource ? '1px' : '2px')};
  right: ${(props) => (props.isInCardResource ? '0' : '1px')};
  background-color: ${(props) =>
    props.isInCardResource ? 'transparent' : 'rgba(255, 255, 255, 0.5)'};
  padding: ${(props) => (props.isInCardResource ? '1px' : '2px')};
  margin-left: ${(props) => (props.isInCardResource ? '0' : '3px')};

  > img {
    cursor: pointer;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.1);
    }
  }
`

export const EditResource: FC<TEditResourceProps> = ({
  description,
  id,
  title,
  url,
  resourceType,
  topics,
  isInCardResource = false,
}) => {
  const { t } = useTranslation()
  const { slug } = useParams()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const openModal = () => {
    setIsModalOpen(true)
  }
  const { data: fetchedTopics } = useListTopics({
    queryParams: { slug },
  })
  const mappedTopics =
    fetchedTopics?.map((topic: TMappedTopics) => ({
      id: topic.id,
      value: topic.id,
      label: topic.name,
    })) ?? []
  const initialTopicId = topics && topics.length > 0 ? topics[0].topic.id : ''

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        toggleModal={() => setIsModalOpen(false)}
        title={t('Editar recurso')}
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
        <ButtonContainerStyled gap={dimensions.spacing.xs}>
          <ButtonStyled outline>{t('Eliminar')}</ButtonStyled>
        </ButtonContainerStyled>
      </Modal>
      <StyledSvg onClick={openModal} isInCardResource={isInCardResource}>
        <img
          src={icons.editPen}
          alt={t('Editar recurso')}
          data-testid="edit-icon"
        />
      </StyledSvg>
    </>
  )
}
