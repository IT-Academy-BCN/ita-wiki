import { FC } from 'react'
import styled from 'styled-components'
import { CheckBox, Label, Text } from '../atoms'
import { colors, dimensions, FlexBox, font } from '../../styles'

const StyledFlexbox = styled(FlexBox)`
  gap: ${dimensions.spacing.xs};
`

const StyledText = styled(Text)`
  margin-top: ${dimensions.spacing.md};
  margin-bottom: 0.2rem;
`

const CheckBoxStyled = styled(CheckBox)`
  ${Label} {
    font-weight: ${font.medium};
    color: ${colors.black.black3};
    cursor: pointer;
  }
`

const statusData: string[] = ['Por ver', 'Vistos']

const StatusFilterWidget: FC = () => (
  <StyledFlexbox direction="column" align="start">
    <StyledText fontWeight="bold">Estado</StyledText>
    {statusData.map((item: string) => (
      <CheckBoxStyled key={item} id={item} label={item} defaultChecked />
    ))}
  </StyledFlexbox>
)

export { StatusFilterWidget }
