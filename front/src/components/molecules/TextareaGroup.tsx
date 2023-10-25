import { forwardRef, Ref } from 'react'
import styled from 'styled-components'
import Textarea, { TTextarea } from '../atoms/Textarea'
import { Label, ValidationMessage } from '../atoms'
import { dimensions, FlexBox } from '../../styles'
import { TValidationMessage } from '../atoms/ValidationMessage'

const TextareaGroupStyled = styled(FlexBox)`
  align-items: flex-start;
  ${Textarea} {
    margin-top: ${dimensions.spacing.xs};
  }
  margin-top: ${dimensions.spacing.xs};
`

type TTextareaGroup = {
  id: string
  name: string
  label: string
  hiddenLabel?: boolean
  validationMessage?: TValidationMessage['text']
  validationType?: TValidationMessage['color']
} & TTextarea

const TextareaGroup = forwardRef(
  (
    {
      label,
      id,
      name,
      hiddenLabel,
      rows,
      cols,
      validationMessage,
      validationType,
      ...rest
    }: TTextareaGroup,
    ref: Ref<HTMLTextAreaElement>
  ) => (
    <TextareaGroupStyled>
      <Label text={label} htmlFor={id} hiddenLabel={hiddenLabel} />
      <Textarea
        name={name}
        id={id}
        rows={rows}
        {...rest}
        ref={ref}
        data-testid="textarea"
      />
      <ValidationMessage text={validationMessage} color={validationType} />
    </TextareaGroupStyled>
  )
)

export default TextareaGroup
