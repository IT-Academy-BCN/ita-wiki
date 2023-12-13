import styled from 'styled-components'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { FlexBox, device, dimensions } from '../../styles'
import icons from '../../assets/icons'
import { paths } from '../../constants'
import { CategoriesList } from './CategoriesList'

const LateralMenu = styled(FlexBox)`
  display: none;

  @media only ${device.Tablet} {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-top: ${dimensions.spacing.lg};
  }
`

const LogoImage = styled.img`
  max-width: 116px;
  height: auto;
`

export const DesktopSideMenu: FC = () => (
  <LateralMenu>
    <Link to={paths.home}>
      <LogoImage src={icons.itLogo} alt="IT Academy" />
    </Link>
    <CategoriesList />
    <div style={{ height: '79px' }} />
  </LateralMenu>
)
