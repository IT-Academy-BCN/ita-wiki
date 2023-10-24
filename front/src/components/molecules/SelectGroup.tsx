import { forwardRef } from 'react'
import styled from 'styled-components'
import { dimensions } from '../../styles'
import { Label, ValidationMessage, Select } from '../atoms'
import { TSelectGroup } from '../../types'

const SelectGroupStyled = styled.div`
  ${ValidationMessage} {
    margin-top: ${dimensions.spacing.xxxs};
    margin-bottom: ${dimensions.spacing.none};
  }
  width: 100%;
`

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
