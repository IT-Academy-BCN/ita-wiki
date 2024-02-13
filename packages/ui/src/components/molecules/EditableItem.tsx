import { FC, useRef } from 'react'
import styled from 'styled-components'
import { colors, dimensions, FlexBox, font } from '../../styles'
import { Button, Icon, Input, Text } from '../atoms'

const Container = styled.div<{ $isdisabled: boolean }>`
  pointer-events: ${(props) => (props.$isdisabled ? 'none' : 'auto')};
  opacity: ${(props) => (props.$isdisabled ? 0.5 : 1)};
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
  padding: 0;
  cursor: pointer;
`

const StyledButton = styled(Button).attrs({ type: 'button' })`
  width: 2rem;
  height: 2rem;
  border: 1px solid ${colors.gray.gray4};

  &:hover {
    border: 1px solid ${colors.primaryDark};
  }
`

const TextButton = styled(StyledButton)`
  width: 5rem;
  color: ${colors.gray.gray3};
  font-weight: 600;
  font-size: ${font.xs};

  &:hover {
    color: ${colors.primary};
  }
`

const DeleteButton = styled(StyledButton)`
  background-color: #f4ebec;
  border: 1px solid ${colors.gray.gray4};

  &:hover {
    border: 1px solid ${colors.primaryDark};
  }
`

const StyledIcon = styled(Icon)`
  scale: 0.8;
`

const StyledInput = styled(Input)`
  border: none;
  padding: ${dimensions.spacing.base} 0;
  margin-right: ${dimensions.spacing.xxxs};
  font-size: ${font.base};
`

const DeletingText = styled(Text)`
  text-decoration: line-through;
  color: ${colors.error};
`

export type TItem = {
  id?: string
  name: string
  slug?: string
  categoryId?: string
}

export type TItemRow = {
  handleErrorMessage: (message: string) => void
  handleItemChange: (actionItem: string, changedItem: TItem) => void
  rowStatus: 'available' | 'editing' | 'deleting' | 'disabled'
  placeholderTxt: string
  newPlaceholderTxt: string
  cancelTxt: string
  confirmEditTxt: string
  cancelEditTxt: string
} & TItemAvailable

export type TItemAvailable = {
  id: string
  name: string
  handleRowStatus: (selectedStatus: string, id: string) => void
  newItemTxt: string
  editTxt: string
  deleteTxt: string
  deleteIcon: string
}

const AvailableMode: FC<TItemAvailable> = ({
  id,
  name,
  handleRowStatus,
  newItemTxt,
  editTxt,
  deleteTxt,
  deleteIcon,
}) => {
  if (id === 'newItem') {
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
          {newItemTxt}
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
          {editTxt}
        </TextButton>
        <DeleteButton
          outline
          title={deleteTxt}
          onClick={() => {
            handleRowStatus('deleting', id)
          }}
        >
          <img src={deleteIcon} alt={deleteTxt} />
        </DeleteButton>
      </FlexBoxRow>
    </StyledFlexBox>
  )
}

export const EditableItem: FC<TItemRow> = ({
  id,
  name,
  handleRowStatus,
  handleErrorMessage,
  handleItemChange,
  rowStatus,
  newItemTxt,
  placeholderTxt,
  newPlaceholderTxt,
  editTxt,
  cancelTxt,
  confirmEditTxt,
  cancelEditTxt,
  deleteTxt,
  deleteIcon,
}) => {
  const itemNameRef = useRef<HTMLInputElement | null>(null)

  const editItem = (idToEdit: string) => {
    const itemName: string =
      itemNameRef.current?.value !== undefined ? itemNameRef.current.value : ''

    if (itemNameRef.current?.value === '') {
      handleErrorMessage('errorEmptyTxt')
      return
    }

    if (itemName === name) {
      handleRowStatus('available', '')
      return
    }

    if (idToEdit === 'newItem') {
      const createdItem = {
        name: itemName,
      }
      handleItemChange('create', createdItem)
    } else {
      const updatedItem = {
        name: itemName,
        id: idToEdit,
      }
      handleItemChange('update', updatedItem)
    }
  }

  const deleteItem = (idToDelete: string) => {
    const deletedItem = {
      id: idToDelete,
      name: '',
    }
    handleItemChange('delete', deletedItem)
  }

  const setAvailable = () => {
    handleErrorMessage('')
    handleRowStatus('available', '')
  }

  return (
    <Container
      $isdisabled={rowStatus === 'disabled'}
      data-testid="rowContainer"
    >
      {rowStatus !== 'editing' && rowStatus !== 'deleting' ? (
        <AvailableMode
          id={id}
          name={name}
          handleRowStatus={handleRowStatus}
          newItemTxt={newItemTxt}
          editTxt={editTxt}
          deleteTxt={deleteTxt}
          deleteIcon={deleteIcon}
        />
      ) : null}
      {rowStatus === 'editing' ? (
        <StyledFlexBox
          direction="row"
          justify="space-between"
          align="center"
          id={id}
        >
          <StyledInput
            placeholder={id === 'newItem' ? newPlaceholderTxt : placeholderTxt}
            defaultValue={name}
            ref={itemNameRef}
            id="editingItem"
            data-testid="input"
          />
          <FlexBoxRow direction="row" gap={`${dimensions.spacing.xxxs}`}>
            <StyledButton
              outline
              aria-label={confirmEditTxt}
              title={confirmEditTxt}
              onClick={() => {
                editItem(id)
              }}
              data-testid={`confirm${id}`}
            >
              <StyledIcon name="done" color={`${colors.success}`} $wght={600} />
            </StyledButton>
            <StyledButton
              outline
              aria-label={cancelEditTxt}
              title={cancelEditTxt}
              onClick={() => {
                setAvailable()
              }}
            >
              <StyledIcon name="close" color={`${colors.error}`} $wght={600} />
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
              {cancelTxt}
            </TextButton>
            <DeleteButton
              outline
              title={deleteTxt}
              onClick={() => {
                deleteItem(id)
              }}
            >
              <img src={deleteIcon} alt={deleteTxt} />
            </DeleteButton>
          </FlexBoxRow>
        </StyledFlexBox>
      ) : null}
    </Container>
  )
}
