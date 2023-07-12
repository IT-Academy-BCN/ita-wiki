import { forwardRef } from 'react'
import styled from 'styled-components'
import { dimensions } from '../../styles'
import { Label, ValidationMessage, Select } from '../atoms'
import { TValidationMessage } from '../atoms/ValidationMessage'
import { TSelect } from '../atoms/Select'

const SelectGroupStyled = styled.div`
  ${ValidationMessage} {
    margin-top: ${dimensions.spacing.xxxs};
    margin-bottom: ${dimensions.spacing.none};
  }
  width: 100%;
`
type TSelectGroup = {
  id: string
  name: string
  label: string
  hiddenLabel?: boolean
  icon?: string
  validationMessage?: TValidationMessage['text']
} & TSelect

const SelectGroup = forwardRef<HTMLSelectElement, TSelectGroup>(
  ({ label, id, name, hiddenLabel, icon, validationMessage, ...rest }, ref) => (
    <SelectGroupStyled>
      <Label text={label} htmlFor={id} hiddenLabel={hiddenLabel} />
      <Select id={id} name={name} ref={ref} {...rest} />
      <ValidationMessage text={validationMessage} color="error" />
    </SelectGroupStyled>
  )
)

export default styled(SelectGroup)``
