import styled from 'styled-components'
import { Link, useLocation, useParams } from 'react-router-dom'
import { FC, useEffect, useState } from 'react'
import { QueryFunctionContext, useQuery } from '@tanstack/react-query'
import { FlexBox, colors, device, dimensions, font } from '../styles'
import { paths, urls } from '../constants'
import icons from '../assets/icons'
import {
  CategoriesList,
  MyFavoritesList,
  MyResources,
  ResourceCardList,
  ResourceForm,
  TopicsRadioWidget,
} from '../components/organisms'
import { Button, Icon, Input, Text, Title } from '../components/atoms'
import { TFilters } from '../helpers'
import {
  InputGroup,
  Modal,
  SelectGroup,
  StatusFilterWidget,
  TypesFilterWidget,
} from '../components/molecules'
import { useAuth } from '../context/AuthProvider'

const MainContainer = styled.div`
  display: block;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;

  @media ${device.Tablet} {
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    background-color: ${colors.gray.gray5};
    height: 100vh;
    width: 100%;
    padding: ${dimensions.spacing.xl};
  }
`

const LateralDiv = styled.div`
  display: none;

  @media ${device.Tablet} {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
`

const ImageStyled = styled.img`
  margin-bottom: ${dimensions.spacing.xl};
  margin-left: ${dimensions.spacing.xl};
  max-width: 79px;
  height: auto;
`

const WhiteContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${colors.white};
  width: 100%;
  height: 100%;
  border-radius: ${dimensions.borderRadius.base};

  @media ${device.Tablet} {
    flex-direction: row;
  }
`

const FiltersContainer = styled(FlexBox)`
  display: none;

  @media ${device.Tablet} {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex: 1 2 20rem;
    padding: ${dimensions.spacing.sm} ${dimensions.spacing.xxxl};
  }
`

const ScrollTopics = styled(FlexBox)`
  overflow-y: scroll;
  justify-content: flex-start;

  &::-webkit-scrollbar {
    display: none;
  }
`

const ResourcesContainer = styled(FlexBox)`
  padding: 1.2rem 1.5rem;
  justify-content: flex-start;
  align-items: flex-start;
  /* overflow: scroll; */
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  @media ${device.Laptop} {
    flex: 4 1 26rem;
  }
`

const TitleResourcesContainer = styled(FlexBox)`
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
  padding: ${dimensions.spacing.base} ${dimensions.spacing.none};
`

const SearchBar = styled(InputGroup)`
  display: none;

  @media ${device.Tablet} {
    display: flex;
    color: ${colors.gray.gray4};
    margin-top: 1rem;
    width: 40%;

    ${FlexBox} {
      justify-content: flex-start;
    }

    ${Input} {
      padding: ${dimensions.spacing.base};
      padding-left: 2.8rem;
      font-size: ${font.xs};
      font-weight: ${font.regular};
      border: none;
      text-align: right;
    }

    ${Icon} {
      padding-left: 0.8rem;
      font-size: ${font.base};
      scale: 1.8;
      color: ${colors.gray.gray3};
    }
  }
`

const VotesDateContainer = styled(FlexBox)`
  display: none;

  @media ${device.Tablet} {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    direction: row;
    width: 100%;
  }
`

const ScrollDiv = styled(FlexBox)`
  overflow: hidden;
  overflow-x: auto;
  width: 100%;

  &::-webkit-scrollbar {
    display: none;
  }
`

const ContainerWhiteScroll = styled(FlexBox)`
  display: none;

  @media ${device.Tablet} {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    padding: ${dimensions.spacing.none} ${dimensions.spacing.md};
    gap: ${dimensions.spacing.xl};
  }
`

const WhiteScrollDiv = styled(FlexBox)`
  justify-content: flex-start;
  align-items: flex-start;
  flex: 1 2 20rem;
  overflow: hidden;
  overflow-x: auto;
  width: 100%;
  height: auto;
  background-color: ${colors.white};
  border-radius: ${dimensions.borderRadius.base};
  padding: ${dimensions.spacing.none} ${dimensions.spacing.xxl};

  &::-webkit-scrollbar {
    display: none;
  }
`

const MobileTopicsContainer = styled(FlexBox)`
  justify-content: flex-start;
  align-items: flex-start;
  background-color: ${colors.gray.gray5};
  padding: ${dimensions.spacing.lg};
  position: sticky;
  top: 0;
  z-index: 1;

  @media ${device.Tablet} {
    display: none;
  }
`

const NewResourceButton = styled(Button)`
  border-radius: ${dimensions.borderRadius.sm};
  padding: ${dimensions.spacing.md};
  color: ${colors.gray.gray3};
  background-color: ${colors.white};
  border: 1px dashed ${colors.gray.gray3};
  margin-bottom: ${dimensions.spacing.xs};

  &:hover {
    background-color: ${colors.white};
    border: 1px dashed ${colors.gray.gray3};
  }

  @media ${device.Tablet} {
    display: none;
  }
`

const StyledSelectGroup = styled(SelectGroup)`
  border: none;

  &:focus {
    outline: 0 none;
  }
`

const FilterButton = styled(Button)`
  color: ${colors.black.black1};
  background-color: ${colors.white};
  border: 2px solid ${colors.gray.gray3};
  width: fit-content;
  padding: ${dimensions.spacing.xs} ${dimensions.spacing.lg};

  &:hover {
    background-color: ${colors.white};
    border: 2px solid ${colors.gray.gray3};
  }

  @media ${device.Tablet} {
    display: none;
  }
`

const MobileFiltersContainer = styled.div`
  display: block;
  align-items: flex-start;
  justify-content: flex-start;
  padding: ${dimensions.spacing.md};
  height: 50%;
  width: 100%;
  position: sticky;
  bottom: 0;
  z-index: 1;
  background-color: rgba(255, 255, 255, 0.9);
  border-top-left-radius: ${dimensions.borderRadius.sm};
  border-top-right-radius: ${dimensions.borderRadius.sm};
  box-shadow: ${dimensions.spacing.none} -0.2rem ${dimensions.spacing.base} ${colors.gray.gray3};
  @media ${device.Tablet} {
    display: none;
  }
`

const CloseFilterButton = styled(Button)`
  color: ${colors.black.black1};
  background-color: ${colors.white};
  border: none;
  font-size: larger;
  margin-top: ${dimensions.spacing.base};

  &:hover {
    background-color: ${colors.white};
    border: none;
  }
`

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getTopics = async (query?: QueryFunctionContext<string[], any>) => {
  const slug = query?.queryKey[1] as string
  return fetch(`${urls.getTopics}?category=${slug}`)
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

type TMappedTopics = {
  id: string
  name: string
}

const NewCategory: FC = () => {
  const { slug } = useParams()
  const { state } = useLocation()
  const { user } = useAuth()

  //  ==> MODAL STATES
  const [isOpen, setIsOpen] = useState(false)
  const [isAccessModalOpen, setIsAccessModalOpen] = useState(false)
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)

  const [topic, setTopic] = useState('todos')
  const [filters, setFilters] = useState<TFilters>({
    slug,
    resourceTypes: [],
    status: [],
    topic: topic === 'todos' ? undefined : topic,
  })

  const handleFiltersOpen = () => {
    setIsFiltersOpen(true)
  }

  useEffect(() => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      slug,
    }))
  }, [slug])

  const handleTypesFilter = (selectedTypes: string[]) => {
    setFilters({ ...filters, resourceTypes: selectedTypes })
  }

  const handleStatusFilter = (selectedStatus: string[]) => {
    setFilters({ ...filters, status: selectedStatus })
  }

  const handleAccessModal = () => {
    setIsAccessModalOpen(!isAccessModalOpen)
  }

  const handleTopicFilter = (selectedTopic: string) => {
    const filterTopic = selectedTopic === 'todos' ? undefined : selectedTopic
    setFilters({ ...filters, topic: filterTopic })
    setTopic(selectedTopic)
  }

  // const handleSelectTopicFilter = (event: {
  //   target: { label: string; value: string }
  // }) => {
  //   const selectedTopic = event.target.value
  //   const filterTopic = selectedTopic
  //   setFilters({ ...filters, topic: filterTopic })
  //   setTopic(selectedTopic)
  //   console.log('filter', filters)
  //   console.log('selected', selectedTopic)
  // }

  const { data: fetchedTopics } = useQuery(['getTopics', slug || ''], getTopics)

  const mappedTopics = fetchedTopics?.topics.map((t: TMappedTopics) => {
    const selectOptions = { value: t.id, label: t.name }
    return selectOptions
  })

  return (
    <MainContainer>
      <Container>
        <LateralDiv>
          <Link to={paths.home}>
            <ImageStyled src={icons.itLogo} alt="IT Academy logo" />
          </Link>
          <CategoriesList />
        </LateralDiv>

        <MobileTopicsContainer>
          <Title as="h2" fontWeight="bold">
            Temas
          </Title>
          <StyledSelectGroup
            defaultValue={topic}
            options={mappedTopics}
            id="topics"
            label="Temas"
            name="topics"
          />
        </MobileTopicsContainer>

        <WhiteContainer>
          <FiltersContainer data-testid="filters-container">
            <Title as="h2" fontWeight="bold">
              Filtros
            </Title>
            <Text fontWeight="bold">Temas</Text>
            <ScrollTopics>
              {slug && (
                <TopicsRadioWidget
                  slug={slug}
                  topic={topic}
                  setTopic={handleTopicFilter}
                />
              )}
            </ScrollTopics>
            <TypesFilterWidget handleTypesFilter={handleTypesFilter} />
            <StatusFilterWidget handleStatusFilter={handleStatusFilter} />
          </FiltersContainer>
          <ResourcesContainer>
            <TitleResourcesContainer>
              <Title as="h2" fontWeight="bold">
                Recursos de {state?.name}
              </Title>
              <SearchBar
                data-testid="inputGroupSearch"
                label="searchResource"
                name="searchResource"
                placeholder="Buscar recurso"
                id="searchResource"
                icon="search"
              />
              <FilterButton onClick={handleFiltersOpen}>Filtrar</FilterButton>
            </TitleResourcesContainer>
            <VotesDateContainer>
              <FlexBox direction="row" gap="15px">
                <FlexBox direction="row">
                  <Text fontWeight="bold">Votos</Text>
                  <Icon name="arrow_downward" />
                </FlexBox>
                <Text color={colors.gray.gray3}>Fecha</Text>
              </FlexBox>
            </VotesDateContainer>
            <ScrollDiv>
              <NewResourceButton
                onClick={
                  user ? () => setIsOpen(!isOpen) : () => handleAccessModal()
                }
              >
                + Crear nuevo recurso
              </NewResourceButton>
              <ResourceCardList
                handleAccessModal={handleAccessModal}
                filters={filters}
                sortOrder="desc"
              />
            </ScrollDiv>
          </ResourcesContainer>
        </WhiteContainer>

        {isFiltersOpen && (
          <MobileFiltersContainer>
            <TypesFilterWidget handleTypesFilter={handleTypesFilter} />
            <StatusFilterWidget handleStatusFilter={handleStatusFilter} />
            <CloseFilterButton onClick={() => setIsFiltersOpen(false)}>
              Cerrar
            </CloseFilterButton>
          </MobileFiltersContainer>
        )}
        <ContainerWhiteScroll>
          <WhiteScrollDiv>
            <MyFavoritesList />
          </WhiteScrollDiv>
          <WhiteScrollDiv>
            <MyResources />
          </WhiteScrollDiv>
        </ContainerWhiteScroll>
      </Container>
      {/* ==> ADD RESOURCE MODAL */}
      <Modal
        isOpen={isOpen}
        toggleModal={() => setIsOpen(false)}
        title="Nuevo Recurso"
      >
        <ResourceForm selectOptions={mappedTopics} />
        <Button outline onClick={() => setIsOpen(false)}>
          Cancelar
        </Button>
      </Modal>
    </MainContainer>
  )
}

export default NewCategory
