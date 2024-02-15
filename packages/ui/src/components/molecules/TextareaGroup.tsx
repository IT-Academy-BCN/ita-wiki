import { forwardRef, Ref } from 'react'
import styled from 'styled-components'
import {
  Label,
  ValidationMessage,
  Textarea,
  type TTextarea,
  type TValidationMessage,
} from '../atoms'
import { dimensions, FlexBox } from '../../styles'

const TextareaStyled = styled(Textarea)``

const TextareaGroupStyled = styled(FlexBox)`
  ${TextareaStyled} {
    margin-top: ${dimensions.spacing.xs};
  }
  margin-top: ${dimensions.spacing.xs};
`

export type TTextareaGroup = {
  id: string
  name: string
  label: string
  hiddenLabel?: boolean
  validationMessage?: TValidationMessage['text']
  validationType?: TValidationMessage['color']
} & TTextarea

export const TextareaGroup = forwardRef(
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
    <TextareaGroupStyled align="start">
      <Label text={label} htmlFor={id} hiddenLabel={hiddenLabel} />
      <TextareaStyled
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
