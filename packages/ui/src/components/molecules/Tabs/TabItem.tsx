import { type FC } from 'react'
import styled from 'styled-components'
import { colors, dimensions, font } from '../../../styles'

const TabItemLi = styled.li<{ $isactive: boolean }>`
  list-style-type: none;
  margin: 0;
  align-self: baseline;
  padding: ${dimensions.spacing.xs} ${dimensions.spacing.xl};
  cursor: ${(props) => (props.$isactive ? 'default' : 'pointer')};
  color: ${(props) =>
    props.$isactive ? `${colors.black.black1}` : `${colors.gray.gray3}`};
  font-weight: ${(props) =>
    props.$isactive ? `${font.bold}` : `${font.medium}`};
  border-bottom: 1px solid
    ${(props) => (props.$isactive ? `${colors.primary}` : 'transparent')};
  box-shadow: ${(props) =>
    props.$isactive ? `0px 2px 0px ${colors.primary}` : 'transparent'};
  -webkit-box-shadow: 0px 2px 0px
    ${(props) => (props.$isactive ? `${colors.primary}` : 'transparent')};
  -moz-box-shadow: 0px 2px 0px
    ${(props) => (props.$isactive ? `${colors.primary}` : 'transparent')};
  font-family: ${font.fontFamily};

  &:hover {
    color: ${(props) =>
      props.$isactive ? `${colors.black.black1}` : `${colors.gray.gray2}`};
    border-bottom: 1px solid
      ${(props) =>
        props.$isactive ? `${colors.primary}` : `${colors.primaryLight}`};
    -webkit-box-shadow: 0px 2px 0px
      ${(props) =>
        props.$isactive ? `${colors.primary}` : `${colors.primaryLight}`};
    -moz-box-shadow: 0px 2px 0px
      ${(props) =>
        props.$isactive ? `${colors.primary}` : `${colors.primaryLight}`};
    box-shadow: 0px 2px 0px
      ${(props) =>
        props.$isactive ? `${colors.primary}` : `${colors.primaryLight}`};
    font-weight: ${font.bold};
  }
`

type TTabItem = {
  title: string
  index: number
  $isactive: boolean
  setActiveTab: (index: number) => void
}

export const TabItem: FC<TTabItem> = ({
  title,
  $isactive,
  setActiveTab,
  index,
}) => (
  <TabItemLi
    onClick={() => setActiveTab(index)}
    $isactive={$isactive}
    role="button"
  >
    {title}
  </TabItemLi>
)
