import { FC } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import Text from './Text'
import Icon from './Icon'
import { font, dimensions, device, colors, FlexBox } from '../../styles'
import { Spinner } from './Spinner'

const CounterWrapper = styled(FlexBox)`
  @media only ${device.Tablet} {
    position: relative;
    background-color: ${colors.gray.gray5};
    border-radius: 15px;
    min-width: 11rem;
    min-height: 5.3rem;
  }
`

const CounterStyled = styled(Text)`
  font-size: 18px;
  font-weight: ${font.bold};
  margin: 0 0 0.4em;

  @media only ${device.Tablet} {
    font-size: 30px;
    margin: ${dimensions.spacing.none};
  }
`

const ErrorStyled = styled(Text)`
  font-size: 16px;
  font-weight: ${font.xs};
  margin: 2px 0 8px 0;

  @media only ${device.Tablet} {
    font-size: 18px;
    margin: 9px 0 4px 0;
  }
`

const TextStyled = styled(Text)`
  font-size: ${font.xs};
  color: ${colors.gray.gray3};
  margin: ${dimensions.spacing.none};
  text-align: center;

  @media only ${device.Tablet} {
    color: ${colors.black.black1};
  }
`

const IconStyled = styled(Icon)<{ name: string }>`
  display: none;
  @media only ${device.Tablet} {
    display: block;
    position: absolute;
    top: ${({ name }) => (name === 'expand_less' ? '5px' : '7px')};
    right: 8px;
    rotate: ${({ name }) => (name === 'attach_file' ? '45deg' : 0)};
  }
`

type TCounter = {
  number?: number
  text: string
  icon: string
  isError: boolean
}

const Counter: FC<TCounter> = ({ number, text, icon, isError }) => {
  const { t } = useTranslation()

  return (
    <CounterWrapper>
      <IconStyled name={icon} wght={600} fill={0} />
      {isError && <ErrorStyled>{t('n/d')}</ErrorStyled>}
      {!isError &&
        (number === 0 || number ? (
          <CounterStyled data-testid={text}>{number}</CounterStyled>
        ) : (
          <Spinner
            size="xsmall"
            role="status"
            style={{ marginTop: '6px', marginBottom: '10px' }}
          />
        ))}
      <TextStyled>{text}</TextStyled>
    </CounterWrapper>
  )
}
export default Counter

// //    {isError && <ErrorStyled>n/d</ErrorStyled>}
//       {(!isError && number === 0 || number) ? (
//         <CounterStyled data-testid={text}>{number}</CounterStyled>
//       ) : (
//         <Spinner
//           size="xsmall"
//           role="status"
//           style={{ marginTop: '6px', marginBottom: '10px' }}
//         />
//       )}

// //   {isError && <ErrorStyled>n/d</ErrorStyled>}
//       {!isError && (number === 0 || number) && (
//         <CounterStyled data-testid={text}>{number}</CounterStyled>
//       )}
//       {!isError && number === undefined && (
//         <Spinner
//           size="xsmall"
//           role="status"
//           style={{ marginTop: '6px', marginBottom: '10px' }}
//         />
//       )}
