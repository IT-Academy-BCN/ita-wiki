import { Ref, forwardRef } from 'react'
import styled from 'styled-components'
import { FlexBox, dimensions, colors } from '../../styles'
import Label from './Label'

type TRadioOptions = {
  id: string
  name: string
}

type TRadio = {
  options: TRadioOptions[]
  inputName: string
  hiddenLabel?: boolean
  defaultChecked?: string
}

const RadioStyled = styled(FlexBox)`
  ${FlexBox} {
    margin-right: ${dimensions.spacing.xl};
  }

  ${Label} {
    font-weight: normal;
    display: inline-block;
    margin-left: ${dimensions.spacing.xxs} !important;
  }
  accent-color: ${colors.primary};
`

const Radio = forwardRef(
  (
    {
      options,
      inputName,
      hiddenLabel = false,
      defaultChecked,
      ...rest
    }: TRadio,
    ref: Ref<HTMLInputElement>
  ) => (
    <RadioStyled {...rest} direction="row">
      {options?.map(({ id, name }) => (
        <FlexBox direction="row" key={id}>
          <input
            type="radio"
            id={id}
            value={id}
            name={inputName}
            ref={ref}
            defaultChecked={defaultChecked === id}
          />
          <Label htmlFor={id} text={name} hiddenLabel={hiddenLabel} />
        </FlexBox>
      ))}
    </RadioStyled>
  )
)

export default styled(Radio)``
