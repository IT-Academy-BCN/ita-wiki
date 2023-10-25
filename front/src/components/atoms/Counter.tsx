import { FC } from 'react'
import styled from 'styled-components'
import Text from './Text'
import Icon from './Icon'
import { font, dimensions, device, colors, FlexBox } from '../../styles'

const CounterWrapper = styled(FlexBox)`
  @media only ${device.Laptop} {
    position: relative;
    background-color: ${colors.gray.gray5};
    border-radius: 15px;
    min-width: 169px;
    min-height: 84px;
  }
`

const CounterStyled = styled(Text)`
  font-size: 18px;
  font-weight: ${font.bold};
  margin: 0 0 0.4em;

  @media only ${device.Laptop} {
    font-size: 30px;
    margin: ${dimensions.spacing.none};
  }
`

const TextStyled = styled(Text)`
  font-size: ${font.xs};
  color: ${colors.gray.gray3};
  margin: ${dimensions.spacing.none};
  text-align: center;

  @media only ${device.Laptop} {
    color: ${colors.black.black1};
  }
`

const IconStyled = styled(Icon)`
  display: none;
  @media only ${device.Laptop} {
    display: block;
    position: absolute;
    top: 7px;
    right: 8px;
  }
`
type TCounter = {
  number: number
  text: string
  icon: string
}
const Counter: FC<TCounter> = ({ number, text, icon }) => (
  <CounterWrapper>
    <IconStyled name={icon} wght={600} fill={0} />
    <CounterStyled data-testid={text}>{number}</CounterStyled>
    <TextStyled>{text}</TextStyled>
  </CounterWrapper>
)

export default Counter
