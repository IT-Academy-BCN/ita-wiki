import { ReactElement, useState } from 'react'
import styled from 'styled-components'
import { FlexBox, colors, dimensions } from '../../../styles'
import { TabItem } from './TabItem'

const StyledFlexBox = styled(FlexBox)`
  margin: ${dimensions.spacing.xs} ${dimensions.spacing.md};
`

const StyledContentFlexBox = styled(FlexBox)`
  width: 100%;
  margin: ${dimensions.spacing.base} ${dimensions.spacing.md} 0.25rem
    ${dimensions.spacing.md};
`

const TabMenuNav = styled.ul`
  display: flex;
  justify-content: flex-start;
  align-content: end;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
  border-bottom: 1px solid ${colors.black.black3};
  width: 100%;
`

type TTabsData = {
  title: string;
  tabComponent: ReactElement | null
}

const Tabs = ({ tabsData }: { tabsData: TTabsData[] }) => {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <StyledFlexBox gap="1rem" as="nav">
      <TabMenuNav>
        {tabsData.map((item: TTabsData, index: number) => (
          <TabItem
            key={item.title}
            title={item.title}
            index={index}
            isActive={activeTab === index}
            setActiveTab={setActiveTab}
          />
        ))}
      </TabMenuNav>
      <StyledContentFlexBox>
        {tabsData[activeTab].tabComponent}
      </StyledContentFlexBox>
    </StyledFlexBox>
  )
}

export default Tabs
