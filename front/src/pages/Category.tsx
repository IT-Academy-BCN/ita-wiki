import { useParams } from 'react-router-dom'
import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled, { keyframes } from 'styled-components'
import {
  DesktopSideMenu,
  Login,
  MyFavoritesList,
  MyResources,
  Navbar,
  Register,
  ResourceCardList,
  ResourceForm,
  Search,
  TopicsRadioWidget,
  VotesDateController,
} from '../components/organisms'
import { Button, Text, Title } from '../components/atoms'
import {
  AccessModalContent,
  Modal,
  SelectGroup,
  StatusFilterWidget,
  TypesFilterWidget,
} from '../components/molecules'
import { useAuth } from '../context/AuthProvider'
import { useGetResources, useGetTopics } from '../hooks'
import { TFilters, TResource, TSortOrder } from '../types'
import { FlexBox, colors, device, dimensions, responsiveSizes } from '../styles'

const Container = styled(FlexBox)`
  background-color: ${colors.white};
  width: 100%;

  @media only ${device.Tablet} {
    height: 100vh;
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    align-items: center;
    background-color: ${colors.gray.gray5};
    padding: ${dimensions.spacing.none} ${dimensions.spacing.md}
      ${dimensions.spacing.xl} ${dimensions.spacing.sm};
  }
`

const ContainerMain = styled(FlexBox)`
  width: 100%;
  height: 90%;

  @media ${device.Tablet} {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: ${dimensions.spacing.sm};
    justify-content: flex-end;
  }

  @media ${device.Desktop} {
    gap: ${dimensions.spacing.xl};
  }
`

const WiderContainer = styled(FlexBox)`
  width: 100%;
  height: 100%;
  justify-content: flex-start;
`

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background-color: ${colors.white};
  padding: ${dimensions.spacing.sm} ${dimensions.spacing.xxs};
  border-radius: ${dimensions.borderRadius.base};

  @media ${device.Tablet} {
    flex-direction: row;
    padding: ${dimensions.spacing.md} ${dimensions.spacing.base};
  }

  @media ${device.Desktop} {
    flex-direction: row;
    padding: ${dimensions.spacing.md} ${dimensions.spacing.xxxl};
  }
`

const FiltersContainer = styled(FlexBox)`
  display: none;

  @media ${device.Tablet} {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex: 1 2 9rem;
  }

  @media ${device.Laptop} {
    padding-top: ${dimensions.spacing.xxs};
    flex: 1 2 28rem;
  }

  @media ${device.Desktop} {
    flex: 1 2 34rem;
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
  padding-left: ${dimensions.spacing.xxxs};
  justify-content: flex-start;
  align-items: flex-start;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  @media ${device.Laptop} {
    width: 100%;
    padding-left: ${dimensions.spacing.md};
  }
`

const TitleResourcesContainer = styled(FlexBox)`
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: row;
  width: 100%;
  padding: ${dimensions.spacing.none};
`

const ScrollDiv = styled(FlexBox)`
  overflow: hidden;
  overflow-x: auto;
  width: 100%;

  &::-webkit-scrollbar {
    display: none;
  }
`

const ContainerResourcesAside = styled(FlexBox)`
  display: none;

  @media ${device.Tablet} {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    align-content: flex-end;
    gap: ${dimensions.spacing.sm};
    max-width: 12rem;
  }

  @media ${device.Laptop} {
    max-width: 16rem;
    gap: ${dimensions.spacing.md};
  }

  @media ${device.Desktop} {
    max-width: 20rem;
    gap: ${dimensions.spacing.xl};
  }
`

const ResourcesAside = styled(FlexBox)`
  justify-content: flex-start;
  align-items: flex-start;
  flex: 1 2 19rem;
  overflow: hidden;
  overflow-x: auto;
  width: 100%;
  background-color: ${colors.white};
  border-radius: ${dimensions.borderRadius.base};
  padding: ${dimensions.spacing.none} ${dimensions.spacing.md};

  &::-webkit-scrollbar {
    display: none;
  }

  @media ${device.Laptop} {
    padding: ${dimensions.spacing.none} ${dimensions.spacing.xs}
      ${dimensions.spacing.md} ${dimensions.spacing.lg};
  }
`
const MobileContainer = styled(FlexBox)`
  justify-content: flex-start;
  align-items: flex-start;
  background-color: ${colors.gray.gray5};
  padding: ${dimensions.spacing.none} ${dimensions.spacing.xs}
    ${dimensions.spacing.md} ${dimensions.spacing.base};
  position: sticky;
  top: 0;
  z-index: 1;
  height: 100%;
  width: 100%;
  @media ${device.Tablet} {
    display: none;
  }
`

const MobileTopicsContainer = styled(MobileContainer)<{ isSearch: boolean }>`
  display: ${({ isSearch }) => (isSearch ? 'none' : 'flex')};
  @media ${device.Tablet} {
    display: none;
  }
`
const MobileSearchContainer = styled(MobileContainer)<{
  isSearch: boolean
}>`
  display: ${({ isSearch }) => (isSearch ? 'flex' : 'none')};
  @media ${device.Tablet} {
    display: none;
  }
`

const NewResourceButton = styled(Button)<{ isSearch: boolean }>`
  display: ${({ isSearch }) => (isSearch ? 'none' : 'flex')};
  border-radius: ${dimensions.borderRadius.sm};
  padding: ${dimensions.spacing.md};
  color: ${colors.gray.gray3};
  background-color: ${colors.white};
  border: 1px dashed ${colors.gray.gray3};
  margin: ${dimensions.spacing.xs} ${dimensions.spacing.none};

  &:hover {
    background-color: ${colors.white};
    border: 1px dashed ${colors.gray.gray3};
  }

  @media ${device.Mobile} {
    display: none;
  }
`

const StyledSelectGroup = styled(SelectGroup)`
  border: none;

  &:focus {
    outline: 0 none;
  }
`

const FilterButton = styled(Button)<{ isMobile: boolean; isSearch: boolean }>`
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
  ${({ isMobile, isSearch }) =>
    isMobile &&
    isSearch &&
    `
    margin-bottom: ${dimensions.spacing.xs}
  `}
`
const slideInAnimation = keyframes`
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0);
  }
`

const slideOutAnimation = keyframes`
  0% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(100%);
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
  &.open {
    transform: translateY(100%);
    animation: ${slideInAnimation} 1s forwards;
  }

  &.close {
    transform: translateY(0%);
    animation: ${slideOutAnimation} 1s forwards;
  }

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
const getWindowIsMobile = () =>
  window.innerWidth <= parseInt(responsiveSizes.tablet, 10)

const Category: FC = () => {
  const { slug } = useParams()
  const { user } = useAuth()

  //  ==> MODAL STATES
  const [isOpen, setIsOpen] = useState(false)
  const [isAccessModalOpen, setIsAccessModalOpen] = useState(false)
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const [isRegisterOpen, setIsRegisterOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isSortByVotesActive, setIsSortByVotesActive] = useState(false)

  const [topic, setTopic] = useState('todos')
  const [filters, setFilters] = useState<TFilters>({
    slug,
    resourceTypes: [],
    status: [],
    topic: topic === 'todos' ? undefined : topic,
  })
  const {
    data: resourcesData,
    isLoading: resourcesLoading,
    error: resourcesError,
  } = useGetResources(filters)
  const [sortOrder, setSortOrder] = useState<TSortOrder>('desc')
  const [isSearch, setIsSearch] = useState<boolean>(false)
  const [searchValue, setSearchValue] = useState<string | null>('')
  const [isSearchError, setIsSearchError] = useState<boolean>(false)
  const [selectedSortOrderValue, setSelectedSortOrderValue] = useState<
    TResource[]
  >([])
  const [isMobile, setIsMobile] = useState(getWindowIsMobile())
  const { t } = useTranslation()

  const toggleModal = () => {
    setIsOpen(!isOpen)
  }

  const handleFiltersOpen = () => {
    setIsFiltersOpen(true)
  }

  const handleFiltersClose = () => {
    setIsFiltersOpen(false)
  }

  useEffect(() => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      slug,
      search: searchValue ?? undefined,
    }))
  }, [searchValue, slug])

  const handleSearch = useCallback((value: string | null) => {
    const isError = value !== null && value.length < 2
    setIsSearchError(isError)

    setFilters((prevFilters) => ({
      ...prevFilters,
      search: isError ? undefined : value ?? undefined,
    }))
    setSearchValue(value ?? '')
  }, [])

  const toggleSearch = () => {
    setIsSearch(!isSearch)
    if (isSearch) {
      setSearchValue(null)
      setIsSearchError(false)
    }
  }
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(getWindowIsMobile())
    }
    window.addEventListener('resize', handleResize)
  }, [isMobile])
  const handleTypesFilter = (selectedTypes: string[]) => {
    setFilters({ ...filters, resourceTypes: selectedTypes })
  }

  const handleStatusFilter = (selectedStatus: string[]) => {
    setFilters({ ...filters, status: selectedStatus })
  }

  const handleAccessModal = () => {
    setIsAccessModalOpen(!isAccessModalOpen)
  }

  const handleRegisterModal = () => {
    setIsRegisterOpen(!isRegisterOpen)
  }

  const handleLoginModal = () => {
    setIsLoginOpen(!isLoginOpen)
  }

  const handleTopicFilter = (selectedTopic: string) => {
    const filterTopic = selectedTopic === 'todos' ? undefined : selectedTopic
    setFilters({ ...filters, topic: filterTopic })
    setTopic(selectedTopic)
  }

  const handleSelectTopicFilter = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedTopic = event.target.value
    const filterTopic = selectedTopic === 'todos' ? undefined : selectedTopic
    setFilters({ ...filters, topic: filterTopic })
    setTopic(selectedTopic)
  }

  const handleSortOrder = () => {
    setSortOrder((prevSortOrder) => (prevSortOrder === 'desc' ? 'asc' : 'desc'))
  }

  const handleSortByVotes = () => {
    setIsSortByVotesActive(true)
  }

  const handleSortByDates = () => {
    setIsSortByVotesActive(false)
  }
  const handleSelectedSortOrderChange = (
    selectedSortOrder: Array<TResource>
  ) => {
    setSelectedSortOrderValue(selectedSortOrder)
  }

  const { data: fetchedTopics } = useGetTopics(slug ?? '')

  const mappedTopicsForFilterWidget = [
    { value: 'todos', label: 'Todos' },
    ...(fetchedTopics?.map((tp) => {
      const selectOptions = { id: tp.id, value: tp.slug, label: tp.name }
      return selectOptions
    }) ?? []),
  ]

  const topicsForResourceForm = fetchedTopics?.map((tp) => ({
    id: tp.id,
    value: tp.slug,
    label: tp.name,
  }))

  return (
    <>
      <Container direction="row" justify="flex-start" align="start">
        <DesktopSideMenu />
        <WiderContainer>
          <Navbar
            toggleModal={toggleModal}
            handleAccessModal={handleAccessModal}
            toggleSearch={toggleSearch}
          />
          <MobileTopicsContainer isSearch={isSearch}>
            <Title as="h2" fontWeight="bold">
              {t('Temas')}
            </Title>
            <StyledSelectGroup
              defaultValue={topic}
              options={mappedTopicsForFilterWidget}
              id="topics"
              label="Temas"
              name="topics"
              onChange={handleSelectTopicFilter}
            />
          </MobileTopicsContainer>
          <MobileSearchContainer
            isSearch={isSearch}
            data-testid="mobile-search-component"
          >
            <Search
              searchValue={searchValue}
              toggleSearch={toggleSearch}
              isSearchError={isSearchError}
              isSearch={isSearch}
              resourcesData={resourcesData}
              handleSearch={handleSearch}
            />
          </MobileSearchContainer>
          <ContainerMain>
            <MainContainer as="main">
              <FiltersContainer data-testid="filters-container">
                <Title as="h2" fontWeight="bold">
                  {t('Filtros')}
                </Title>
                <Text fontWeight="bold">{t('Temas')}</Text>

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
                {user && (
                  <StatusFilterWidget handleStatusFilter={handleStatusFilter} />
                )}
              </FiltersContainer>
              <ResourcesContainer>
                <TitleResourcesContainer>
                  {!isMobile && (
                    <Search
                      searchValue={searchValue}
                      toggleSearch={toggleSearch}
                      isSearchError={isSearchError}
                      isSearch={isSearch}
                      resourcesData={resourcesData}
                      handleSearch={handleSearch}
                    />
                  )}
                  <FilterButton
                    data-testid="filters-button"
                    onClick={handleFiltersOpen}
                    isMobile={isMobile}
                    isSearch={isSearch}
                  >
                    {t('Filtrar')}
                  </FilterButton>
                </TitleResourcesContainer>
                {selectedSortOrderValue?.length > 0 && (
                  <VotesDateController
                    sortOrder={sortOrder}
                    handleSortOrder={handleSortOrder}
                    handleSortByVotes={handleSortByVotes}
                    handleSortByDates={handleSortByDates}
                  />
                )}
                <ScrollDiv>
                  <NewResourceButton
                    isSearch={isSearch}
                    onClick={
                      user
                        ? () => setIsOpen(!isOpen)
                        : () => handleAccessModal()
                    }
                  >
                    <span data-testid="new-resource-text">
                      + {t('Crear nuevo recurso')}
                    </span>
                  </NewResourceButton>
                </ScrollDiv>
                <ScrollDiv>
                  <ResourceCardList
                    handleAccessModal={handleAccessModal}
                    sortOrder={sortOrder}
                    isSortByVotesActive={isSortByVotesActive}
                    resourcesData={resourcesData}
                    resourcesError={resourcesError}
                    resourcesLoading={resourcesLoading}
                    onSelectedSortOrderChange={handleSelectedSortOrderChange}
                  />
                </ScrollDiv>
              </ResourcesContainer>
            </MainContainer>
            {isFiltersOpen && (
              <MobileFiltersContainer
                data-testid="mobile-filters"
                className={isFiltersOpen ? 'open' : 'close'}
              >
                <TypesFilterWidget handleTypesFilter={handleTypesFilter} />
                {user && (
                  <StatusFilterWidget handleStatusFilter={handleStatusFilter} />
                )}
                <CloseFilterButton
                  data-testid="close-filters-button"
                  onClick={handleFiltersClose}
                >
                  {t('Cerrar')}
                </CloseFilterButton>
              </MobileFiltersContainer>
            )}
            <ContainerResourcesAside as="aside">
              <ResourcesAside>
                <MyFavoritesList />
              </ResourcesAside>
              <ResourcesAside>
                <MyResources />
              </ResourcesAside>
            </ContainerResourcesAside>
          </ContainerMain>
        </WiderContainer>
      </Container>
      {/* ==> ADD RESOURCE MODAL */}
      <Modal
        isOpen={isOpen}
        toggleModal={toggleModal}
        title={t('Nuevo Recurso')}
      >
        <ResourceForm selectOptions={topicsForResourceForm ?? []} />
        <Button outline onClick={toggleModal}>
          {t('Cancelar')}
        </Button>
      </Modal>
      {/* RESTRICTED ACCES MODAL */}
      <Modal isOpen={isAccessModalOpen} toggleModal={handleAccessModal}>
        <AccessModalContent
          handleLoginModal={handleLoginModal}
          handleRegisterModal={handleRegisterModal}
          handleAccessModal={handleAccessModal}
        />
      </Modal>
      {/* LOGIN AND REGISTER MODALS (INCLUDE BOTH!! - THEY TOGGLE) */}
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
  )
}

export default Category
