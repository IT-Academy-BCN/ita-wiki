import { useState } from 'react'
import styled from 'styled-components'
import { FlexBox, colors, dimensions, font } from '../../styles'
import { Icon, Text } from '../atoms'
import { CreateAuthor } from './CreateAuthor'
import { ResourceTitleLink } from './ResourceTitleLink'
import icons from '../../assets/icons'

const CardContainerStyled = styled(FlexBox)`
  border-radius: ${dimensions.borderRadius.sm};
  border: 1px solid ${colors.gray.gray3};
  height: 7rem;
  margin: ${dimensions.spacing.xxxs} auto;
  padding: 0.8rem 0.6rem 0.6rem 0.2rem;
  width: 100%;
  min-width: 15rem;
  position: relative;
`

const StyledSvg = styled.div`
  position: absolute;
  top: ${dimensions.spacing.xxs};
  right: ${dimensions.spacing.xxs};
  padding: 2px;
  background-color: rgba(255, 255, 255, 0.5);
`

const CounterContainerStyled = styled(FlexBox)`
  margin: 0 ${dimensions.spacing.xs};
  align-self: flex-start;

  ${Text} {
    margin: 0rem;
  }
`

const ArrowLessIcon = styled(Icon)`
  color: ${colors.gray.gray3};
  cursor: pointer;

  &:hover {
    color: ${colors.success};
  }
`
const ArrowMoreIcon = styled(Icon)`
  color: ${colors.gray.gray3};
  cursor: pointer;

  &:hover {
    color: ${colors.error};
  }
`

const FlexBoxStyled = styled(FlexBox)`
  height: 100%;
  ${FlexBox} {
    gap: 2px;
  }

  ${Text} {
    margin: 0rem;
    margin-top: 2px;
  }
`

type TCardResource = {
  key: string
  title: string
  description: string
  url: string
  img: string
  createdBy: string
  createdOn: string
}
export const CardResource = ({
  key,
  title,
  url,
  description,
  img,
  createdBy,
  createdOn,
}: TCardResource) => {
  const [editable] = useState<boolean>(false)

  return (
    <CardContainerStyled
      direction="row"
      align="center"
      justify="flex-start"
      id={key}
    >
      {editable && (
        <StyledSvg>
          <img src={icons.editPen} alt="Editar recurso" />
        </StyledSvg>
      )}
      {/* TODO: Change this section by Vote molecule */}

      <CounterContainerStyled align="center" justify="flex-start">
        <ArrowLessIcon name="expand_less" opsz={20} />
        <Text fontSize={font.xs} fontWeight="bold">
          11
        </Text>
        <ArrowMoreIcon name="expand_more" />
      </CounterContainerStyled>

      <FlexBoxStyled align="start" justify="space-between" gap="4px">
        <ResourceTitleLink description={description} title={title} url={url} />
        <CreateAuthor createdBy={createdBy} createdOn={createdOn} img={img} />
      </FlexBoxStyled>
    </CardContainerStyled>
  )
}
