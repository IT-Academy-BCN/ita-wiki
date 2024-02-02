import { forwardRef } from 'react'
import styled from 'styled-components'
import { dimensions, Label, ValidationMessage } from '@itacademy/ui'
import { Select } from '../atoms'
import { TValidationMessage } from '../atoms/ValidationMessage'
import { TSelect } from '../atoms/Select'
import { newId } from '../../utils/newId'

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
  icon?: string
  validationMessage?: TValidationMessage['text']
} & TSelect

const SelectGroup = forwardRef<HTMLSelectElement, TSelectGroup>(
  ({ label, id, name, hiddenLabel, icon, validationMessage, ...rest }, ref) => {
    const uniqueTagId = newId()

    return (
      <SelectGroupStyled>
        <Label text={label} htmlFor={uniqueTagId} hiddenLabel={hiddenLabel} />
        <Select id={uniqueTagId} name={name} ref={ref} {...rest} />
        <ValidationMessage text={validationMessage} color="error" />
      </SelectGroupStyled>
    )
  }
)

export default styled(SelectGroup)``
