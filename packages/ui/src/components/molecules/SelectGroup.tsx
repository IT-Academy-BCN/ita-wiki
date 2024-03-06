import { forwardRef } from 'react'
import styled from 'styled-components'
import { colors, dimensions } from '../../styles'
import {
  Label,
  Select,
  ValidationMessage,
  type TSelect,
  type TValidationMessage,
  Icon,
} from '../atoms'

const IconStyled = styled(Icon)``
const ValidationMessageStyled = styled(ValidationMessage)``

const SelectGroupStyled = styled.div`
  ${ValidationMessageStyled} {
    margin-top: ${dimensions.spacing.xxxs};
    margin-bottom: ${dimensions.spacing.none};
  }
  width: 100%;

  /* ${IconStyled}::before{
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    content: "";
  } */
`

const SelectWrapper = styled.div`
  display: flex;
`

export type TSelectGroup = {
  id: string
  name: string
  label: string
  hiddenLabel?: boolean
  validationMessage?: TValidationMessage['text']
  icon?: string
} & TSelect

export const SelectGroup = forwardRef<HTMLSelectElement, TSelectGroup>(
  ({ label, id, name, hiddenLabel, validationMessage, icon, ...rest }, ref) => (
    <SelectGroupStyled>
      <Label text={label} htmlFor={id} hiddenLabel={hiddenLabel} />

      <SelectWrapper>
        {icon && <IconStyled name='arrow_back_ios' id={icon} style={{marginTop: '15px'}}/>}
        <Select id={id} name={name} ref={ref} {...rest} /> 
      </SelectWrapper>

      <ValidationMessageStyled text={validationMessage} color="error" />
    </SelectGroupStyled>
  )
)
