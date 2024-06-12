import { FC } from 'react'
import { FlexBox, Icon, colors, dimensions, font } from '@itacademy/ui'
import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { icons } from '../../assets/icons'
import { paths, menu, TMenu } from '../../constants'
import { useAuth } from '../../context/AuthProvider'
import { filterMenuByUserRole } from '../../helpers/filters'

const SideMenuStyled = styled(FlexBox)`
  height: 100%;
  min-width: 12rem;
  margin-top: ${dimensions.spacing.xxs};
`

const MenuOptions = styled(Link)`
  text-decoration: none;
  margin: ${dimensions.spacing.none};
  padding: ${dimensions.spacing.xxxs};
`

type TMenuOptionStyled = {
  active?: boolean
}

const MenuOptionStyled = styled.span<TMenuOptionStyled>`
  color: ${({ active }) => (active ? colors.black.black3 : colors.gray.gray3)};
  font-size: ${font.xs};
  font-weight: ${font.medium};
  font-family: ${font.fontFamily};
  cursor: pointer;
  transition: transform 0.3s ease;
  outline: none;

  &:hover {
    color: ${({ active }) => (active ? colors.black.black3 : colors.primary)};
    transform: scale(1.05);
  }

  &::before {
    content: '${({ active }) => (active ? '●' : '')}';
    font-size: larger;
    color: ${colors.primary};
    margin-right: ${dimensions.spacing.xxxs};
  }
`

const ImgStyled = styled(Icon)`
  height: ${dimensions.spacing.lg};

  &[data-testid] {
    content: attr(data-testid);
  }
`

const LogoImage = styled.img`
  max-width: 7.25rem;
  height: auto;
`
const MenuOptionsComponent: FC<{ item: TMenu; pathname: string }> = ({
  item,
  pathname,
}) => {
  const { t } = useTranslation()
  return (
    <MenuOptions
      to={item.path}
      tabIndex={0}
      key={item.id}
      data-testid={`menu-link-${item.title.toLowerCase()}`}
    >
      <FlexBox direction="row" gap={dimensions.spacing.xxxs}>
        <ImgStyled
          data-testid={`menu-icon-${item.icon}`}
          name={item.icon}
          color={`${colors.black.black3}`}
        />
        <MenuOptionStyled
          active={pathname === item.path}
          data-testid={`menu-title-${item.title.toLowerCase()}`}
        >
          {t(item.title)}
        </MenuOptionStyled>
      </FlexBox>
    </MenuOptions>
  )
}
export const SideMenu: FC = () => {
  const { pathname } = useLocation()
  const { user } = useAuth()

  return (
    <SideMenuStyled
      justify="space-between"
      align="start"
      data-testid={`menu-path-${pathname}`}
    >
      <Link to={paths.home}>
        <LogoImage src={icons.itLogo} alt="IT Academy" />
      </Link>
      <FlexBox align="start" gap={dimensions.spacing.sm}>
        {menu
          .filter((item) => filterMenuByUserRole(user, item))
          .map((item) => (
            <MenuOptionsComponent
              key={item.id}
              item={item}
              pathname={pathname}
            />
          ))}
      </FlexBox>
      <div style={{ height: '79px' }} />
    </SideMenuStyled>
  )
}
