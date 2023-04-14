import { forwardRef, Ref } from 'react'
import styled from 'styled-components'
import Textarea, { TTextarea } from '../atoms/Textarea'
import { Label } from '../atoms'
import { dimensions } from '../../styles'

const TextareaGroupStyled = styled.div`
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
} & TTextarea

const TextareaGroup = forwardRef(
  (
    { label, id, name, hiddenLabel, rows, cols, ...rest }: TTextareaGroup,
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
    </TextareaGroupStyled>
  )
)

export default TextareaGroup
