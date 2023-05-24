import { Ref, forwardRef } from 'react'
import styled from 'styled-components'
import { FlexBox, dimensions } from '../../styles'
import Label from './Label'

type TRadioOptions = {
  id: string
  label: string
}

type TRadio = {
  options: TRadioOptions[]
  name: string
  hiddenLabel?: boolean
  defaultChecked?: string
}

const RadioStyled = styled(FlexBox)`
  flex-direction: row;
  flex-direction: column;
  //align-items: start;
  ${FlexBox} {
    margin-right: ${dimensions.spacing.xl};
  }

  ${Label} {
    font-weight: normal;
    display: inline-block;
    margin-left: ${dimensions.spacing.xxs} !important;
  }
`

const Radio = forwardRef(
  (
    { options, name, hiddenLabel = false, defaultChecked, ...rest }: TRadio,
    ref: Ref<HTMLInputElement>
  ) => (
    <RadioStyled {...rest}>
      {options.map(({ id, label }) => (
        <FlexBox direction="row" key={id}>
          <input
            type="radio"
            id={id}
            value={id}
            name={name}
            ref={ref}
            defaultChecked={defaultChecked === id}
          />
          <Label htmlFor={id} text={label} hiddenLabel={hiddenLabel} />
        </FlexBox>
      ))}
    </RadioStyled>
  )
)

export default styled(Radio)``
