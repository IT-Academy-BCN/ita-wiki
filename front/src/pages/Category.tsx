import { FC, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import qs from 'qs'
import styled from 'styled-components'
import { QueryFunctionContext, useQuery } from '@tanstack/react-query'
import { FlexBox, colors, device, dimensions, font } from '../styles'
import { Button, Icon, Input, Text, Title } from '../components/atoms'
import {
  AccessModalContent,
  InputGroup,
  Modal,
  SelectGroup,
  StatusFilterWidget,
  TypesFilterWidget,
} from '../components/molecules'
import {
  CategoriesList,
  MyFavoritesList,
  MyResources,
  Navbar,
  ResourceCardList,
  ResourceForm,
  TopicsRadioWidget,
  Login,
  Register,
} from '../components/organisms'
import icons from '../assets/icons'
import { paths, urls } from '../constants'
import { useAuth } from '../context/AuthProvider'

export const MobileStyled = styled.div`
  display: block;
  @media only ${device.Tablet} {
    display: none;
  }
`
export const DesktopStyled = styled.div`
  display: none;
  @media only ${device.Tablet} {
    display: block;
  }
`

const ScrollList = styled(FlexBox)`
  overflow: hidden;
  overflow-x: auto;
  width: 100%;
  &::-webkit-scrollbar {
    display: none;
  }
`
const ScrollDiv = styled(FlexBox)`
  overflow: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`

// style Desktop
const MainContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  direction: row;
  background-color: ${colors.gray.gray5};
  height: 100vh;
  width: 100%;
  padding: ${dimensions.spacing.xl};
`

const DivStyled = styled.div`
  display: flex;
  direction: row;
  background-color: ${colors.white};
  width: 100%;
  height: 100%;
  border-radius: ${dimensions.borderRadius.base};
`

const LateralDiv = styled.div`
  height: 100%;
`

const UserResourcesContainerStyled = styled(FlexBox)`
  align-items: flex-start;
  margin-bottom: ${dimensions.spacing.md};
`

const ImageStyled = styled.img`
  margin-bottom: ${dimensions.spacing.xl};
  margin-left: ${dimensions.spacing.xl};
  max-width: 79px;
  height: auto;
`

const SideColumnContainer = styled(FlexBox)`
  justify-content: flex-start;
  align-items: flex-start;
  flex: 1 2 20rem;
  padding: 2rem 2rem;

  @media ${device.Tablet} {
    padding: 1.2rem 3rem;
  }
`

const MiddleColumnContainer = styled(FlexBox)`
  flex: 4 1 26rem;
  padding: 1.2rem 3rem;
  border-right: solid 1px ${colors.gray.gray3};
  justify-content: flex-start;
  align-items: flex-start;
  overflow: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`

const SearchBar = styled(InputGroup)`
  color: ${colors.gray.gray4};
  margin-top: 1rem;

  ${FlexBox} {
    justify-content: flex-start;
  }

  ${Input} {
    padding: ${dimensions.spacing.base};
    padding-left: 2.8rem;
    font-size: ${font.xs};
    font-weight: ${font.regular};
    border-color: ${colors.gray.gray3};
  }

  ${Icon} {
    padding-left: 0.8rem;
    font-size: ${font.base};
    scale: 1.8;
    color: ${colors.gray.gray3};
  }
`
// END style Desktop

const HeaderContainerStyled = styled(FlexBox)`
  background-color: ${colors.gray.gray5};
  padding: 5rem ${dimensions.spacing.base} ${dimensions.spacing.xl};
  ${SelectGroup} {
    border-radius: ${dimensions.borderRadius.sm};
    color: ${colors.black.black1};
    font-weight: 700;
  }
`
const ButtonAddStyled = styled(Button)`
  border-radius: 50%;
  font-size: xx-large;
  font-weight: 400;
  height: 52px;
  width: 52px;
`

const ButtonStyled = styled(Button)`
  margin: ${dimensions.spacing.none};
`

const ButtonContainterStyled = styled(FlexBox)`
  margin-top: 0.8rem;

  ${Button} {
    background-color: ${colors.white};
    border-radius: ${dimensions.borderRadius.sm};
    border: none;
    color: ${colors.gray.gray3};
    font-weight: 500;
    padding: ${dimensions.spacing.xs} ${dimensions.spacing.base};
    width: fit-content;

    &:hover {
      background-color: ${colors.primary};
      border: none;
      color: ${colors.white};
    }
  }
`

const SubHeaderContainerStyled = styled(FlexBox)`
  padding: ${dimensions.spacing.base};
`

const TextContainerStyled = styled(FlexBox)`
  gap: 0.8rem;
`

const TitleContainer = styled(FlexBox)`
  flex-direction: row;
  gap: ${dimensions.spacing.xxxs};
  margin-top: ${dimensions.spacing.xl};
`

type TMappedTopics = {
  id: string
  name: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getTopics = (query?: QueryFunctionContext<string[], any>) => {
  const filters = query?.queryKey[1] as string

  return fetch(`${urls.getTopics}?${filters}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Error fetching topics: ${res.statusText}`)
      }
      return res.json()
    })
    .catch((err) => {
      throw new Error(`Error fetching topics: ${err.message}`)
    })
}

const buildQueryString = ({ slug, resourceTypes, status }: TFilters) =>
  qs.stringify({
    slug,
    resourceTypes,
    status,
  })

type TFilters = {
  slug?: string
  resourceTypes?: string[]
  status?: string[]
}

const Category: FC = () => {
  const { state } = useLocation()
  const { slug } = useParams()

  const { user } = useAuth()

  const [isOpen, setIsOpen] = useState(false)
  const [isRegisterOpen, setIsRegisterOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isAccessModalOpen, setIsAccessModalOpen] = useState(false)

  const [filters, setFilters] = useState<TFilters>({
    slug,
    resourceTypes: [],
    status: [],
  })

  const handleRegisterModal = () => {
    setIsRegisterOpen(!isRegisterOpen)
  }

  const handleLoginModal = () => {
    setIsLoginOpen(!isLoginOpen)
  }

  const handleAccessModal = () => {
    setIsAccessModalOpen(!isAccessModalOpen)
  }

  const { data: fetchedTopics } = useQuery(
    ['getTopics', buildQueryString(filters) || ''],
    getTopics
  )

  const mappedTopics = fetchedTopics?.topics.map((topic: TMappedTopics) => {
    const selectOptions = { value: topic.id, label: topic.name }
    return selectOptions
  })

  const handleTypesFilter = (selectedTypes: string[]) => {
    setFilters({ ...filters, resourceTypes: selectedTypes })
  }

  const handleStatusFilter = (selectedStatus: string[]) => {
    setFilters({ ...filters, status: selectedStatus })
  }

  return (
    <>
      <MobileStyled>
        <HeaderContainerStyled align="stretch">
          <Navbar title="Wiki" />
          <FlexBox direction="row" justify="space-between">
            <Title as="h1" fontWeight="bold" data-testid="category-title">
              Recursos de {state?.name}
            </Title>
            <ButtonAddStyled
              onClick={
                user ? () => setIsOpen(!isOpen) : () => handleAccessModal()
              }
            >
              +
            </ButtonAddStyled>
          </FlexBox>

          <Text fontWeight="bold">Temas</Text>

          <SelectGroup
            label="Context API"
            placeholder="Selecciona tema"
            id="theme"
            name="theme"
            options={mappedTopics}
            color="blue"
          />

          <ButtonContainterStyled
            direction="row"
            align="start"
            justify="flex-start"
          >
            <Button>Vídeos</Button>
            <Button>Cursos</Button>
            <Button>Blogs</Button>
          </ButtonContainterStyled>
        </HeaderContainerStyled>

        <SubHeaderContainerStyled direction="row" justify="space-between">
          <Text fontWeight="bold">23 resultados</Text>

          <TextContainerStyled direction="row">
            <Text fontWeight="bold">Votos ↓</Text>
            <Text color={colors.gray.gray3}>Fecha</Text>
          </TextContainerStyled>
        </SubHeaderContainerStyled>
        <ResourceCardList handleAccessModal={handleAccessModal} />
      </MobileStyled>
      <DesktopStyled>
        <MainContainer>
          <LateralDiv>
            <Link to={paths.home}>
              <ImageStyled src={icons.itLogo} alt="logo" />
            </Link>
            <CategoriesList />
          </LateralDiv>
          {/* ==> CONTAINER CON LAS LAS COLUMNAS */}
          <DivStyled>
            {/* ==> COLUMNA BÚSQUEDA */}

            <SideColumnContainer>
              <Title as="h2" fontWeight="bold">
                Filtros
              </Title>
              <Text fontWeight="bold">Temas</Text>
              <ScrollDiv>{slug && <TopicsRadioWidget slug={slug} />}</ScrollDiv>
              <TypesFilterWidget handleTypesFilter={handleTypesFilter} />
              <StatusFilterWidget handleStatusFilter={handleStatusFilter} />
            </SideColumnContainer>
            {/* ==> COLUMNA RECURSOS */}
            <MiddleColumnContainer>
              <Title as="h2" fontWeight="bold">
                Recursos de {state?.name}
              </Title>
              {/* ==> LÍNEA DE VÍDEOS, VOTOS Y FECHA */}
              <FlexBox
                justify="flex-end"
                direction="row"
                style={{ width: '100%' }}
              >
                {/* ==> VOTOS Y FECHA */}
                <FlexBox direction="row" gap="15px">
                  <FlexBox direction="row">
                    <Text fontWeight="bold">Votos</Text>
                    <Icon name="arrow_downward" />
                  </FlexBox>
                  <Text color={colors.gray.gray3}>Fecha</Text>
                </FlexBox>
              </FlexBox>
              <ScrollList>
                <ResourceCardList handleAccessModal={handleAccessModal} />
              </ScrollList>
            </MiddleColumnContainer>
            {/* ==> COLUMNA USUARIO */}
            <SideColumnContainer>
              {/* TÍTULO 1 */}
              <SearchBar
                data-testid="inputGroupSearch"
                label="searchResource"
                name="searchResource"
                placeholder="Buscar recurso"
                id="searchResource"
                icon="search"
              />
              <ScrollDiv>
                <MyFavoritesList />
              </ScrollDiv>
              {/* TÍTULO 2 */}
              <ScrollDiv>
                <UserResourcesContainerStyled>
                  <MyResources />
                </UserResourcesContainerStyled>
              </ScrollDiv>
            </SideColumnContainer>
          </DivStyled>
        </MainContainer>
      </DesktopStyled>
      {/* TODO: MOVE MODALS TO SEPARATE ORGANISMS */}

      {/* // ADD RESOURCE MODAL */}
      <Modal
        isOpen={isOpen}
        toggleModal={() => setIsOpen(false)}
        title="Nuevo Recurso"
      >
        <ResourceForm selectOptions={mappedTopics} />
        <ButtonStyled outline onClick={() => setIsOpen(false)}>
          Cancelar
        </ButtonStyled>
      </Modal>
      {/* // RESTRICTED ACCESS MODAL */}
      <>
        <Modal
          isOpen={isAccessModalOpen}
          toggleModal={() => setIsAccessModalOpen(false)}
        >
          <AccessModalContent
            handleLoginModal={handleLoginModal}
            handleRegisterModal={handleRegisterModal}
            handleAccessModal={handleAccessModal}
          />
        </Modal>
        <Modal
          isOpen={isLoginOpen || isRegisterOpen}
          toggleModal={() =>
            isLoginOpen ? setIsLoginOpen(false) : setIsRegisterOpen(false)
          }
        >
          {isLoginOpen && (
            <Login
              handleLoginModal={handleLoginModal}
              handleRegisterModal={handleRegisterModal}
            />
          )}
          {isRegisterOpen && (
            <Register
              handleLoginModal={handleLoginModal}
              handleRegisterModal={handleRegisterModal}
            />
          )}
        </Modal>
      </>
    </>
  )
}

export { Category }
