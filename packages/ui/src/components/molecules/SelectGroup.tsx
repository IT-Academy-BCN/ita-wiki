import { forwardRef } from 'react'
import styled from 'styled-components'
import { dimensions } from '../../styles'
import { Label, Select, ValidationMessage } from '../atoms'
import { TSelect } from '../atoms/Select'
import { TValidationMessage } from '../atoms/ValidationMessage'

const SelectGroupStyled = styled.div`
  ${ValidationMessage} {
    margin-top: ${dimensions.spacing.xxxs};
    margin-bottom: ${dimensions.spacing.none};
  }
  width: 100%;
`
export type TSelectGroup = {
  id: string
  name: string
  label: string
  hiddenLabel?: boolean
  validationMessage?: TValidationMessage['text']
} & TSelect

export const SelectGroup = forwardRef<HTMLSelectElement, TSelectGroup>(
  ({ label, id, name, hiddenLabel, validationMessage, ...rest }, ref) => (
    <SelectGroupStyled>
      <Label text={label} htmlFor={id} hiddenLabel={hiddenLabel} />
      <Select id={id} name={name} ref={ref} {...rest} />
      <ValidationMessage text={validationMessage} color="error" />
    </SelectGroupStyled>
  )
)
