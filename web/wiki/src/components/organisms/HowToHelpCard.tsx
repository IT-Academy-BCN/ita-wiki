import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { FlexBox, colors, dimensions, Icon, Text } from '@itacademy/ui'
import icons from '../../assets/icons'
import { paths } from '../../constants'

const HowToHelpCardStyled = styled(FlexBox)`
  min-width: 320px;
  position: relative;
  overflow: hidden;
  height: 5rem;
  border: 1px solid ${colors.gray.gray4};
  border-radius: ${dimensions.borderRadius.sm};
  background-color: ${colors.white};
`

const FlexBoxStyled = styled(FlexBox)`
  position: absolute;
  width: 100%;
  gap: 4rem;
`

const ImgStyled = styled.img`
  padding-left: ${dimensions.spacing.base};
`

const IconStyled = styled(Icon)`
  padding-right: ${dimensions.spacing.base};
`

const ColorLightCircle = styled.div`
  position: relative;
  left: -60px;
  top: -5px;
  height: 180px;
  width: 180px;
  border-radius: 50%;
  background-color: ${colors.primaryLight};
`

const ColorCircle = styled.div`
  position: relative;
  left: -230px;
  top: -20px;
  height: 150px;
  width: 150px;
  border-radius: 50%;
  background-color: ${colors.primary};
`

const HowToHelpCard = () => (
  <Link to={paths.information}>
    <HowToHelpCardStyled direction="row" justify="flex-start">
      <ColorLightCircle />
      <ColorCircle />
      <FlexBoxStyled direction="row" justify="space-between">
        <ImgStyled src={icons.newFolder} alt="new folder" />
        <Text fontWeight="bold">¿Cómo colaborar en la wiki?</Text>
        <IconStyled name="arrow_forward_ios" color={colors.gray.gray3} />
      </FlexBoxStyled>
    </HowToHelpCardStyled>
  </Link>
)

export { HowToHelpCard }
