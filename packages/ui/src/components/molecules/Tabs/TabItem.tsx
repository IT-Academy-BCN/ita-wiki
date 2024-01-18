import styled from 'styled-components'
import { colors, dimensions, font } from '../../../styles'

//ERROR: isactive? https://stackoverflow.com/questions/76935768/react-does-not-recognize-the-isactive-prop-on-a-dom-element

const TabItemLi = styled.li<{ isActive: boolean }>`
  list-style-type: none;
  margin: 0;
  align-self: baseline;
  padding: ${dimensions.spacing.xs} ${dimensions.spacing.xl};
  cursor: ${(props) => (props.isActive ? 'default' : 'pointer')};
  color: ${(props) =>
    props.isActive ? `${colors.black.black1}` : `${colors.gray.gray3}`};
  font-weight: ${(props) =>
    props.isActive ? `${font.bold}` : `${font.medium}`};
  border-bottom: 1px solid
    ${(props) => (props.isActive ? `${colors.primary}` : 'transparent')};
  box-shadow: ${(props) =>
    props.isActive ? `0px 2px 0px ${colors.primary}` : 'transparent'};
  -webkit-box-shadow: 0px 2px 0px
    ${(props) => (props.isActive ? `${colors.primary}` : 'transparent')};
  -moz-box-shadow: 0px 2px 0px
    ${(props) => (props.isActive ? `${colors.primary}` : 'transparent')};
  font-family: ${font.fontFamily};

  &:hover {
    color: ${(props) =>
      props.isActive ? `${colors.black.black1}` : `${colors.gray.gray2}`};
    border-bottom: 1px solid
      ${(props) =>
        props.isActive ? `${colors.primary}` : `${colors.primaryLight}`};
    -webkit-box-shadow: 0px 2px 0px
      ${(props) =>
        props.isActive ? `${colors.primary}` : `${colors.primaryLight}`};
    -moz-box-shadow: 0px 2px 0px
      ${(props) =>
        props.isActive ? `${colors.primary}` : `${colors.primaryLight}`};
    box-shadow: 0px 2px 0px
      ${(props) =>
        props.isActive ? `${colors.primary}` : `${colors.primaryLight}`};
    font-weight: ${font.bold};
  }
`

type TTabItem = {
  title: string
  index: number
  isActive: boolean
  setActiveTab: (index: number) => void
}

const TabItem = ({ title, isActive, setActiveTab, index }: TTabItem) => (
  <TabItemLi
    onClick={() => setActiveTab(index)}
    isActive={isActive}
    role="button"
  >
    {title}
  </TabItemLi>
)

export default TabItem
