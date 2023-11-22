import styled, { keyframes } from 'styled-components'
import { useLocation, useParams } from 'react-router-dom'
import { ChangeEvent, FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FlexBox, colors, device, dimensions, font } from '../styles'
import {
  DesktopSideMenu,
  Login,
  MyFavoritesList,
  MyResources,
  Navbar,
  Register,
  ResourceCardList,
  ResourceForm,
  TopicsRadioWidget,
  VotesDateController,
} from '../components/organisms'
import { Button, Icon, Input, Text, Title } from '../components/atoms'

import {
  AccessModalContent,
  InputGroup,
  Modal,
  SelectGroup,
  StatusFilterWidget,
  TypesFilterWidget,
} from '../components/molecules'
import { useAuth } from '../context/AuthProvider'
import { useGetTopics } from '../hooks'

import { TFilters, TResource } from '../types'

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

const SearchBar = styled(InputGroup)`
  display: none;

  @media ${device.Tablet} {
    display: flex;
    color: ${colors.gray.gray4};
    margin-top: ${dimensions.spacing.xxs};
    margin-right: 0.08rem;
    width: 40%;
    max-width: 11rem;
    justify-content: flex-end;

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

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const InputSearchBar = styled.div`
  display: none;

  @media ${device.Tablet} {
    display: flex;
    height: ${dimensions.spacing.lg};
  }
`

const InputSearch = styled.input`
  @media ${device.Tablet} {
    width: 100%;
    margin-right: ${dimensions.spacing.xxxs};
    border-radius: ${dimensions.borderRadius.base};
    border: 1px solid ${colors.gray.gray3};
    padding: ${dimensions.spacing.base};
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

const MobileTopicsContainer = styled(FlexBox)`
  justify-content: flex-start;
  align-items: flex-start;
  background-color: ${colors.gray.gray5};
  padding-right: ${dimensions.spacing.xs};
  padding-left: ${dimensions.spacing.base};
  padding-bottom: ${dimensions.spacing.md};
  padding-top: ${dimensions.spacing.none};
  position: sticky;
  top: 0;
  z-index: 1;
  height: 100%;
  width: 100%;
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
const CancelSearchButton = styled(Button)`
  color: ${colors.gray.gray3};
  background-color: ${colors.white};
  border: 1px solid ${colors.gray.gray3};
  width: fit-content;
  padding: ${dimensions.spacing.base} ${dimensions.spacing.xs};

  &:hover {
    background-color: ${colors.white};
    border: 1px solid ${colors.primary};
  }
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

type SortOrder = 'asc' | 'desc'

const Category: FC = () => {
  const { slug } = useParams()
  const { state } = useLocation()
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

  const [sortOrder, setSortOrder] = useState<SortOrder>('desc')
  const [isSearch, setIsSearch] = useState<boolean>(false)
  const [searchValue, setSearchValue] = useState<string | null>(null)
  const [selectedSortOrderValue, setSelectedSortOrderValue] = useState<
    TResource[]
  >([])
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

  const toggleSearch = () => {
    setIsSearch(!isSearch)
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
          />
          <MobileTopicsContainer>
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
                  {isSearch ? (
                    <SearchContainer>
                      <Title as="h2" fontWeight="bold">
                        {t('Buscar recurso')}
                      </Title>
                      <InputSearchBar>
                        <InputSearch
                          type="text"
                          data-testid="inputSearch"
                          onChange={(e) => setSearchValue(e.target.value)}
                        />
                        <CancelSearchButton
                          onClick={toggleSearch}
                          data-testid="cancelSearchButton"
                        >
                          X
                        </CancelSearchButton>
                      </InputSearchBar>
                      {searchValue !== null && searchValue !== '' ? (
                        <span style={{ marginTop: '20px', fontWeight: 'bold' }}>
                          {t('Mostrando')} {selectedSortOrderValue.length}{' '}
                          {t('resultados para')} &quot;
                          {searchValue}&quot;
                        </span>
                      ) : null}
                    </SearchContainer>
                  ) : (
                    <>
                      <Title as="h2" fontWeight="bold">
                        {t('Recursos de')} {state?.name}
                      </Title>
                      <SearchBar
                        data-testid="inputGroupSearch"
                        label="searchResource"
                        name="searchResource"
                        placeholder={t('Buscar recurso')}
                        id="searchResource"
                        icon="search"
                        onClick={toggleSearch}
                      />
                    </>
                  )}

                  <FilterButton
                    data-testid="filters-button"
                    onClick={handleFiltersOpen}
                  >
                    {t('Filtrar')}
                  </FilterButton>
                </TitleResourcesContainer>
                <VotesDateController
                  sortOrder={sortOrder}
                  handleSortOrder={handleSortOrder}
                  handleSortByVotes={handleSortByVotes}
                  handleSortByDates={handleSortByDates}
                />
                <ScrollDiv>
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
                </ScrollDiv>
                <ScrollDiv>
                  <ResourceCardList
                    handleAccessModal={handleAccessModal}
                    filters={filters}
                    sortOrder={sortOrder}
                    isSortByVotesActive={isSortByVotesActive}
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
