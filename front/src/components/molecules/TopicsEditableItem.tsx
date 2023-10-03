import { useRef } from 'react'
import styled from 'styled-components'
import { colors, dimensions, FlexBox, font } from '../../styles'
import { Button, Icon, Input, Text } from '../atoms'
import icons from '../../assets/icons'

const Container = styled.div<{ isDisabled: boolean }>`
  pointer-events: ${(props) => (props.isDisabled ? 'none' : 'auto')};
  opacity: ${(props) => (props.isDisabled ? 0.5 : 1)};
  width: 100%;
`

const StyledFlexBox = styled(FlexBox)`
  width: 100%;
  border-bottom: 1px solid ${colors.gray.gray3};
`

const FlexBoxRow = styled(FlexBox)`
  padding: ${dimensions.spacing.xxs} 0;
`

const StyledText = styled(Text)`
  padding: 0.09rem 0;
  cursor: pointer;
`

const StyledButton = styled(Button).attrs({ type: 'button' })`
  width: 2rem;
  height: 2rem;
  border-color: ${colors.gray.gray4};
  border-width: 1px;

  :hover {
    border-width: 1px;
  }
`

const TextButton = styled(StyledButton)`
  width: 5rem;
  color: ${colors.gray.gray3};
  font-weight: 600;
  font-size: ${font.xs};

  :hover {
    color: ${colors.primary};
  }
`

const DeleteButton = styled(StyledButton)`
  background-color: #f4ebec;
`

const StyledIcon = styled(Icon)`
  scale: 0.8;
`

const StyledInput = styled(Input)`
  border: none;
  padding: ${dimensions.spacing.xxxs} 0;
`

const DeletingText = styled(Text)`
  text-decoration: line-through;
  color: ${colors.error};
`

type TTopicRow = {
  id: string
  name: string
  handleErrorMessage: (message: string) => void
  handleRowStatus: (selectedStatus: string, id: string) => void
  handleTopicChange: (actionTopic: string, changedTopic: TTopic) => void
  rowStatus: string
}

type TTopic = {
  id?: string
  name: string
  slug?: string
  categoryId?: string
}

type TTopicAvailable = {
  id: string
  name: string
  handleRowStatus: (selectedStatus: string, id: string) => void
}

const AvailableMode = ({ id, name, handleRowStatus }: TTopicAvailable) => {
  if (id === 'newTopic') {
    return (
      <StyledFlexBox
        direction="row"
        justify="flex-start"
        align="center"
        id={id}
      >
        <StyledText
          color={`${colors.primary}`}
          onClick={() => {
            handleRowStatus('editing', id)
          }}
        >
          + Crear nuevo tema
        </StyledText>
      </StyledFlexBox>
    )
  }
  return (
    <StyledFlexBox
      direction="row"
      justify="space-between"
      align="center"
      id={id}
    >
      <Text>{name}</Text>
      <FlexBoxRow direction="row" gap={`${dimensions.spacing.xxxs}`}>
        <TextButton
          outline
          onClick={() => {
            handleRowStatus('editing', id)
          }}
          data-testid={`edit${id}`}
        >
          Editar
        </TextButton>
        <DeleteButton
          outline
          aria-label="Borrar tema"
          onClick={() => {
            handleRowStatus('deleting', id)
          }}
        >
          <img src={icons.deleteIcon} alt="Borrar tema" />
        </DeleteButton>
      </FlexBoxRow>
    </StyledFlexBox>
  )
}

export const TopicsEditableItem = ({
  id,
  name,
  handleRowStatus,
  handleErrorMessage,
  handleTopicChange,
  rowStatus,
}: TTopicRow) => {
  const topicNameRef = useRef<HTMLInputElement | null>(null)

  const editTopic = (idToEdit: string) => {
    const topicName: string =
      topicNameRef.current?.value !== undefined
        ? topicNameRef.current.value
        : ''

    if (topicNameRef.current?.value === '') {
      handleErrorMessage('Por favor, no dejes vacío el nombre del tema.')
      return
    }

    if (topicName === name) {
      handleRowStatus('available', '')
      return
    }

    if (idToEdit === 'newTopic') {
      const createdTopic = {
        name: topicName,
      }
      handleTopicChange('create', createdTopic)
    } else {
      const updatedTopic = {
        name: topicName,
        id: idToEdit,
      }
      handleTopicChange('update', updatedTopic)
    }
  }

  const deleteTopic = (idToDelete: string) => {
    // TODO: Delete topic when DELETE endpoint exists
    // eslint-disable-next-line no-console
    console.log('Deleting:', idToDelete)
    handleErrorMessage('No es posible borrar el tema.')
  }

  const setAvailable = () => {
    handleErrorMessage('')
    handleRowStatus('available', '')
  }

  return (
    <Container isDisabled={rowStatus === 'disabled'} data-testid="rowContainer">
      {rowStatus !== 'editing' && rowStatus !== 'deleting' ? (
        <AvailableMode id={id} name={name} handleRowStatus={handleRowStatus} />
      ) : null}
      {rowStatus === 'editing' ? (
        <StyledFlexBox
          direction="row"
          justify="space-between"
          align="center"
          id={id}
        >
          <StyledInput
            placeholder={
              id === 'newTopic' ? 'Nombre del nuevo tema' : 'Nombre del tema'
            }
            defaultValue={name}
            ref={topicNameRef}
            id="editingTopic"
            data-testid="input"
          />
          <FlexBoxRow direction="row" gap={`${dimensions.spacing.xxxs}`}>
            <StyledButton
              outline
              aria-label="Confirmar edición"
              onClick={() => {
                editTopic(id)
              }}
              data-testid={`confirm${id}`}
            >
              <StyledIcon name="done" color={`${colors.success}`} wght={600} />
            </StyledButton>
            <StyledButton
              outline
              aria-label="Cancelar edición"
              onClick={() => {
                setAvailable()
              }}
            >
              <StyledIcon name="close" color={`${colors.error}`} wght={600} />
            </StyledButton>
          </FlexBoxRow>
        </StyledFlexBox>
      ) : null}
      {rowStatus === 'deleting' ? (
        <StyledFlexBox
          direction="row"
          justify="space-between"
          align="center"
          id={id}
        >
          <DeletingText>{name}</DeletingText>
          <FlexBoxRow direction="row" gap={`${dimensions.spacing.xxxs}`}>
            <TextButton
              outline
              onClick={() => {
                setAvailable()
              }}
            >
              Cancelar
            </TextButton>
            <DeleteButton
              outline
              aria-label="Borrar tema"
              onClick={() => {
                deleteTopic(id)
              }}
            >
              <img src={icons.deleteIcon} alt="Borrar tema" />
            </DeleteButton>
          </FlexBoxRow>
        </StyledFlexBox>
      ) : null}
    </Container>
  )
}
