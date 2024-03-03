import { forwardRef } from 'react'
import styled from 'styled-components'
import { dimensions } from '../../styles'
import {
  Label,
  Select,
  ValidationMessage,
  type TSelect,
  type TValidationMessage,
} from '../atoms'

const ValidationMessageStyled = styled(ValidationMessage)``

const SelectGroupStyled = styled.div`
  ${ValidationMessageStyled} {
    margin-top: ${dimensions.spacing.xxxs};
    margin-bottom: ${dimensions.spacing.none};
  }
  width: 100%;
`

const Icon = styled.img`
    width: 24px;
    height: 24px;
    top: 10px;
    left: 12px;
`

export type TSelectGroup = {
  id: string
  name: string
  label: string
  hiddenLabel?: boolean
  validationMessage?: TValidationMessage['text']
  iconSrc?: string
} & TSelect

export const SelectGroup = forwardRef<HTMLSelectElement, TSelectGroup>(
  ({ label, id, name, hiddenLabel, validationMessage, iconSrc, ...rest }, ref) => (
    <SelectGroupStyled>
      <Label text={label} htmlFor={id} hiddenLabel={hiddenLabel} />
      <Select id={id} name={name} ref={ref} {...rest} />
      {iconSrc && <Icon src={iconSrc} />}
      <ValidationMessageStyled text={validationMessage} color="error" />
    </SelectGroupStyled>
  )
)
