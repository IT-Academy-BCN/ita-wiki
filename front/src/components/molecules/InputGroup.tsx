import { forwardRef, Ref } from 'react'
import styled from 'styled-components'
import { dimensions, FlexBox } from '../../styles'
import { Icon, Input, Label, ValidationMessage } from '../atoms'
import { TInput } from '../atoms/Input'
import { TValidationMessage } from '../atoms/ValidationMessage'

const InputGroupStyled = styled.div`
  ${ValidationMessage} {
    margin-top: ${dimensions.spacing.xxxs};
    margin-bottom: ${dimensions.spacing.none};
  }
  ${Icon} {
    position: absolute;
    margin-right: ${dimensions.spacing.base};
  }
  margin-bottom: ${dimensions.spacing.base};
`
type TInputGroup = {
  id: string
  name: string
  label: string
  validationType?: TValidationMessage['color']
  validationMessage?: TValidationMessage['text']
  icon?: string
  iconClick?: () => void
  onChange?: () => void
  hiddenLabel?: boolean
} & TInput

const InputGroup = forwardRef(
  (
    {
      id,
      name,
      label,
      validationMessage,
      validationType,
      hiddenLabel,
      icon,
      iconClick,
      onChange,
      ...rest
    }: TInputGroup,
    ref: Ref<HTMLInputElement>
  ) => (
    <InputGroupStyled>
      <Label text={label} htmlFor={id} hiddenLabel={hiddenLabel} />
      <FlexBox direction="row" justify="flex-end">
        <Input id={id} name={name} onChange={onChange} 
        {...rest} ref={ref} />
        {!!icon && <Icon name={icon} onClick={iconClick} {...rest} />}
      </FlexBox>
      <ValidationMessage text={validationMessage} color={validationType} />
    </InputGroupStyled>
  )
)

export default styled(InputGroup)``
