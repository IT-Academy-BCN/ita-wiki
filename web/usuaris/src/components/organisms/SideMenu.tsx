import { FC } from 'react'
import { FlexBox, Icon, colors, dimensions, font } from '@itacademy/ui'
import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { icons } from '../../assets/icons'
import { paths, sections } from '../../constants'

const SideMenuStyled = styled(FlexBox)`
  height: 100%;
  min-width: 11.2rem;
  margin-top: ${dimensions.spacing.lg};
`

const LinkSection = styled(Link)`
  text-decoration: none;
  margin: ${dimensions.spacing.none};
  padding: ${dimensions.spacing.xxxs} ${dimensions.spacing.none};
`

type TSectionStyled = {
  active?: boolean
}

const SectionStyled = styled.span<TSectionStyled>`
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

export const SideMenu: FC = () => {
  const { t } = useTranslation()
  const { pathname } = useLocation()

  return (
    <SideMenuStyled
      justify="space-between"
      align="start"
      data-testid={`test-path-${pathname}`}
    >
      <Link to={paths.home}>
        <LogoImage src={icons.itLogo} alt="IT Academy" />
      </Link>
      <FlexBox align="start" gap={dimensions.spacing.sm}>
        {sections.map((item) => (
          <LinkSection
            to={item.path}
            tabIndex={0}
            key={item.id}
            data-testid={`test-link-${item.title}`}
          >
            <FlexBox direction="row" gap={dimensions.spacing.xxxs}>
              <ImgStyled
                data-testid={`test-icon-${item.icon}`}
                name={item.icon}
                color={`${colors.black.black3}`}
              />
              <SectionStyled
                active={pathname === item.path}
                data-testid={`test-title-${item.title}`}
              >
                {t(item.title)}
              </SectionStyled>
            </FlexBox>
          </LinkSection>
        ))}
      </FlexBox>
      <div style={{ height: '79px' }} />
    </SideMenuStyled>
  )
}
