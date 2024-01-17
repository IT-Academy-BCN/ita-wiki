import { Ref, forwardRef } from 'react'
import styled from 'styled-components'
import { FlexBox, dimensions, colors, font } from '../../styles'
import Label from './Label'

type TRadioOptions = {
  id: string
  name: string
}

type TRadio = {
  options: TRadioOptions[]
  inputName: string
  direction: 'row' | 'column'
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  hiddenLabel?: boolean
  defaultChecked?: string
}
const RadioStyled = styled(FlexBox)`
  ${FlexBox} {
    margin-right: ${dimensions.spacing.xl};
    > input {
      width: 1.5rem;
      height: 1.5rem;
      min-width: 1.5rem;
      min-height: 1.5rem;
    }
  }

  ${Label} {
    font-weight: ${font.regular};
    color: ${colors.black.black3};
    display: inline-block;
    margin-left: ${dimensions.spacing.xxs} !important;
    cursor: pointer;
  }
  accent-color: ${colors.primary};
`

const Radio = forwardRef(
  (
    {
      options,
      inputName,
      direction,
      hiddenLabel = false,
      onChange,
      defaultChecked,
      ...rest
    }: TRadio,
    ref: Ref<HTMLInputElement>
  ) => (
    <RadioStyled {...rest} direction={direction}>
      {options?.map(({ id, name }) => (
        <FlexBox direction="row" key={id}>
          <input
            type="radio"
            id={id}
            value={id}
            name={inputName}
            ref={ref}
            defaultChecked={defaultChecked === id}
            onChange={onChange}
          />
          <Label htmlFor={id} text={name} hiddenLabel={hiddenLabel} />
        </FlexBox>
      ))}
    </RadioStyled>
  )
)

export default Radio
