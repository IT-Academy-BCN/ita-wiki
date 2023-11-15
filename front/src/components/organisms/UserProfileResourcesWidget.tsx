import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { TFavorites, TResource } from '../../types'
import CardResource from './CardResource'
import { useAuth } from '../../context/AuthProvider'
import { colors, dimensions, device, FlexBox } from '../../styles'
import { Icon, Spinner, Text, Title } from '../atoms'

type TResourcesWidget = {
  title: string
  titleMobile: string
  resourcesArray: TResource[] | TFavorites[] | undefined
  isLoading: boolean
  isError: boolean
}

const WidgetContainer = styled(FlexBox)`
  width: 100%;
  border-radius: ${dimensions.borderRadius.base};
  overflow: hidden;
  overflow-y: auto;
  padding-left: ${dimensions.spacing.lg};

  @media only ${device.Tablet} {
    height: 62vh;
    background-color: ${colors.white};
    flex-direction: column;
    align-items: flex-start;
    padding: ${dimensions.spacing.sm};
  }

  @media only ${device.Laptop} {
    flex-direction: column;
    align-items: flex-start;
    padding: ${dimensions.spacing.base} ${dimensions.spacing.xxl};
  }

  &::-webkit-scrollbar {
    display: none;
  }
`

const TitleContainer = styled(FlexBox)`
  align-items: stretch;
  align-self: flex-start;
`

const SortContainer = styled(FlexBox)`
  display: none;
  @media only ${device.Tablet} {
    display: flex;
    width: 100%;
    align-items: flex-end;
  }
`

const CardsList = styled(FlexBox)`
  width: 100vw;
  overflow: hidden;
  overflow-x: auto;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;

  @media only ${device.Tablet} {
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    overflow: hidden;
    overflow-y: auto;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`

const StyledTitle = styled(Title)`
  display: none;
  @media only ${device.Tablet} {
    display: block;
  }
`

const StyledTitleMobile = styled(Title)`
  display: block;
  @media only ${device.Tablet} {
    display: none;
  }
`

const StyledFlexbox = styled(FlexBox)`
  height: 100%;
  align-self: center;
`

export const UserProfileResourcesWidget = ({
  title,
  titleMobile,
  resourcesArray,
  isLoading,
  isError,
}: TResourcesWidget) => {
  const { user } = useAuth()
  const { t } = useTranslation()

  return (
    <WidgetContainer justify="flex-start">
      <TitleContainer data-testid="title">
        <StyledTitleMobile as="h3" fontWeight="bold">
          {titleMobile}
        </StyledTitleMobile>
        <StyledTitle as="h2" fontWeight="bold">
          {title}
        </StyledTitle>
      </TitleContainer>

      {isLoading && (
        <StyledFlexbox>
          <Spinner size="medium" role="status" />
        </StyledFlexbox>
      )}
      {!isLoading &&
        resourcesArray &&
        !isError &&
        (resourcesArray?.length > 0 ? (
          <>
            <SortContainer>
              <FlexBox direction="row" gap="15px">
                <FlexBox direction="row">
                  <Text fontWeight="bold">Vots</Text>
                  <Icon name="arrow_downward" />
                </FlexBox>
                <div color={colors.gray.gray3}>Data</div>
              </FlexBox>
            </SortContainer>
            <CardsList gap={`${dimensions.spacing.xs}`} justify="flex-start">
              {resourcesArray?.map((resource) => (
                <CardResource
                  key={resource.id}
                  id={resource.id}
                  img=""
                  title={resource.title}
                  url={resource.url}
                  description={resource.description}
                  voteCount={resource.voteCount}
                  createdBy={resource.user?.name || ''}
                  createdAt={resource.createdAt}
                  updatedAt={resource.updatedAt}
                  isFavorite={
                    'isFavorite' in resource ? resource.isFavorite : true
                  }
                  editable={
                    'isFavorite' in resource
                      ? true
                      : user?.id === resource.userId
                  }
                  resourceType={resource.resourceType}
                  topics={resource.topics}
                  handleAccessModal={() => {}}
                  fromProfile
                />
              ))}
            </CardsList>
          </>
        ) : (
          <StyledFlexbox>
            {title === t('Recursos favoritos')
              ? t('No tienes recursos favoritos')
              : t('No has subido ningún recurso')}
          </StyledFlexbox>
        ))}

      {isError && !isLoading ? (
        <StyledFlexbox>{t('Algo ha ido mal...')}</StyledFlexbox>
      ) : null}
    </WidgetContainer>
  )
}
