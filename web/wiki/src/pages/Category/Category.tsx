import { useParams } from 'react-router-dom'
import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  AccessModalContent,
  Button,
  Modal,
  Text,
  Title,
  responsiveSizes,
} from '@itacademy/ui'
import {
  CloseFilterButton,
  Container,
  ContainerMain,
  ContainerResourcesAside,
  FilterButton,
  FiltersContainer,
  MainContainer,
  MobileFiltersContainer,
  MobileSearchContainer,
  MobileTopicsContainer,
  NewResourceButton,
  ResourcesAside,
  ResourcesContainer,
  ScrollDiv,
  ScrollTopics,
  StyledSelectGroup,
  TitleResourcesContainer,
  WiderContainer,
} from './Category.styles'
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
} from '../../components/organisms'
import {
  StatusFilterWidget,
  TypesFilterWidget,
} from '../../components/molecules'
import { useAuth } from '../../context/AuthProvider'
import { useGetResources, useGetTopics } from '../../hooks'
import { TFilters, TSortOrder } from '../../types'
import icons from '../../assets/icons'

const getWindowIsMobile = () =>
  window.innerWidth <= parseInt(responsiveSizes.tablet, 10)

export const Category: FC = () => {
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
    categorySlug: slug,
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
      categorySlug: slug,
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

  useEffect(() => {
    setTopic('todos')
    setFilters((prevFilters) => ({
      ...prevFilters,
      topic: undefined,
    }))
  }, [slug])

  const handleSortOrder = () => {
    setSortOrder((prevSortOrder) => (prevSortOrder === 'desc' ? 'asc' : 'desc'))
  }

  const handleSortByVotes = () => {
    setIsSortByVotesActive(true)
  }

  const handleSortByDates = () => {
    setIsSortByVotesActive(false)
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
        <WiderContainer justify="flex-start">
          <Navbar
            toggleModal={toggleModal}
            handleAccessModal={handleAccessModal}
            toggleSearch={toggleSearch}
          />
          <MobileTopicsContainer $isSearch={isSearch}>
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
            $isSearch={isSearch}
            data-testid="mobile-search-component"
          >
            <Search
              searchValue={searchValue}
              toggleSearch={toggleSearch}
              isSearchError={isSearchError}
              $isSearch={isSearch}
              resourcesData={resourcesData}
              handleSearch={handleSearch}
            />
          </MobileSearchContainer>
          <ContainerMain>
            <MainContainer as="main" direction="column" align="start">
              <FiltersContainer data-testid="filters-container">
                <Title as="h2" fontWeight="bold">
                  {t('Filtros')}
                </Title>
                <Text fontWeight="bold">{t('Temas')}</Text>

                <ScrollTopics justify="flex-start">
                  {slug && (
                    <TopicsRadioWidget
                      key={slug}
                      slug={slug}
                      setTopic={handleTopicFilter}
                    />
                  )}
                </ScrollTopics>

                <TypesFilterWidget handleTypesFilter={handleTypesFilter} />
                {user && (
                  <StatusFilterWidget handleStatusFilter={handleStatusFilter} />
                )}
              </FiltersContainer>
              <ResourcesContainer justify="flex-start" align="start">
                <TitleResourcesContainer
                  direction="row"
                  justify="space-between"
                  align="start"
                >
                  {!isMobile && (
                    <Search
                      searchValue={searchValue}
                      toggleSearch={toggleSearch}
                      isSearchError={isSearchError}
                      $isSearch={isSearch}
                      resourcesData={resourcesData}
                      handleSearch={handleSearch}
                    />
                  )}
                  <FilterButton
                    data-testid="filters-button"
                    onClick={handleFiltersOpen}
                  >
                    {t('Filtrar')}
                  </FilterButton>
                </TitleResourcesContainer>
                {resourcesData && resourcesData.length > 0 && (
                  <VotesDateController
                    sortOrder={sortOrder}
                    handleSortOrder={handleSortOrder}
                    handleSortByVotes={handleSortByVotes}
                    handleSortByDates={handleSortByDates}
                  />
                )}
                <ScrollDiv>
                  {!isSearch && (
                    <NewResourceButton
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
                  )}
                </ScrollDiv>
                <ScrollDiv>
                  <ResourceCardList
                    handleAccessModal={handleAccessModal}
                    sortOrder={sortOrder}
                    isSortByVotesActive={isSortByVotesActive}
                    resourcesData={resourcesData}
                    resourcesError={resourcesError}
                    resourcesLoading={resourcesLoading}
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
              <ResourcesAside justify="flex-start" align="start">
                <MyFavoritesList />
              </ResourcesAside>
              <ResourcesAside justify="flex-start" align="start">
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
          title={t('Acceso restringido')}
          userMsg={t('Regístrate para subir o votar contenido')}
          registerBtnTitle={t('Registrarme')}
          loginBtnTitle={t('Entrar')}
          img={{ svgSrc: icons.lockDynamic, svgAlt: 'Lock Dynamic Icon' }}
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
