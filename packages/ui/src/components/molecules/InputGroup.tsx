import { forwardRef, Ref } from 'react'
import styled from 'styled-components'
import { dimensions, FlexBox } from '../../styles'
import {
  Icon,
  Input,
  Label,
  ValidationMessage,
  type TInput,
  type TValidationMessage,
} from '../atoms'

const StyledIcon = styled(Icon)``
const ValidationMessageStyled = styled(ValidationMessage)``

const InputGroupStyled = styled.div`
  width: 100%;

  ${ValidationMessageStyled} {
    margin-top: ${dimensions.spacing.xxxs};
    margin-bottom: ${dimensions.spacing.none};
  }

  ${StyledIcon} {
    position: absolute;
    margin-right: ${dimensions.spacing.base};
  }
  margin-bottom: ${dimensions.spacing.base};
`

type TObjectWithDataTestId = {
  'data-testid'?: string
  [
    key: string
  ]: any /* eslint-disable-line @typescript-eslint/no-explicit-any */
}

const iconDataTestId = (rest: TObjectWithDataTestId) => {
  const { 'data-testid': dataTestId } = rest
  if (!dataTestId) {
    return 'icon'
  }
  const upperCaseDataTestId =
    dataTestId.charAt(0).toUpperCase() + dataTestId.slice(1)
  return dataTestId ? `icon${upperCaseDataTestId}` : ''
}

export type TInputGroup = {
  id: string
  name: string
  label: string
  validationType?: TValidationMessage['color']
  validationMessage?: TValidationMessage['text']
  icon?: string
  className?: string
  iconClick?: () => void
  hiddenLabel?: boolean
} & TInput

export const InputGroup = forwardRef(
  (
    {
      id,
      name,
      label,
      validationMessage,
      validationType,
      hiddenLabel,
      icon,
      className,
      iconClick,
      ...rest
    }: TInputGroup,
    ref: Ref<HTMLInputElement>
  ) => (
    <InputGroupStyled className={className}>
      <Label text={label} htmlFor={id} hiddenLabel={hiddenLabel} />
      <FlexBox direction="row" justify="flex-end">
        <Input id={id} name={name} {...rest} ref={ref} />
        {!!icon && (
          <StyledIcon
            name={icon}
            onClick={iconClick}
            {...rest}
            data-testid={iconDataTestId(rest)}
          />
        )}
      </FlexBox>
      <ValidationMessageStyled
        text={validationMessage}
        color={validationType}
      />
    </InputGroupStyled>
  )
)
