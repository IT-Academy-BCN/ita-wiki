import styled from 'styled-components'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import ResourceForm from './ResourceForm'
import { FlexBox, colors, dimensions } from '../../styles'
import { Button } from '../atoms'
import icons from '../../assets/icons'
import { Modal } from '../molecules/Modal'
import { TEditResourceProps, TMappedTopics } from '../../types'
import { useGetTopics } from '../../hooks'
import { TINDEX } from '../../locales/translationIndex'

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
  const { t } = useTranslation()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const { data: fetchedTopics } = useGetTopics()
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
        title={t(TINDEX.EDIT_RESOURCE)}
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
        <img
          src={icons.editPen}
          alt={t(TINDEX.EDIT_RESOURCE)}
          data-testid="edit-icon"
        />
      </StyledSvg>
    </>
  )
}
export default EditResource
