import styled from 'styled-components'
import { FC, useRef } from 'react'
import { FlexBox, font, dimensions } from '../../styles'
import { CheckBox, Label, Title } from '../atoms'

const CheckGroupStateStyled = styled(FlexBox)`
  gap: '5px';
  `

const CheckBoxStyled = styled(CheckBox)`
  margin-left: ${dimensions.spacing.xxxs}

  ${Label} {
    font-weight: ${font.medium};
    font-size: ${font.xs};
  }
`

const CheckGroupState: FC = () => {
  const toSeeRef = useRef(null)
  const seenRef = useRef(null)
  console.log(toSeeRef.current?.checked, seenRef.current?.checked)

  return (
    <CheckGroupStateStyled>
      <Title as="h3" fontWeight="bold">
        Estado
      </Title>
      <FlexBox gap="10px" align="flex-start">
        <CheckBoxStyled label="Por ver" ref={toSeeRef} />
        <CheckBoxStyled label="Vistos" ref={seenRef} />
      </FlexBox>
    </CheckGroupStateStyled>
  )
}

export default styled(CheckGroupState)``
