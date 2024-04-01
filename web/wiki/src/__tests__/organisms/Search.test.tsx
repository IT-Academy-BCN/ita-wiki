import { expect, vi } from 'vitest'
import { fireEvent, render, screen } from '../test-utils'
import { Search } from '../../components/organisms'
import { TResource } from '../../types'

describe('Search component ', () => {
  it('renders correctly', () => {
    render(
      <Search
        resourcesData={[]}
        toggleSearch={vi.fn()}
        $isSearch={false}
        searchValue=""
        handleSearch={vi.fn()}
        isSearchError={false}
      />
    )
    expect(screen.getByText('search')).toBeInTheDocument()
  })

  it('renders search input when isSearch is true', () => {
    render(
      <Search
        resourcesData={[]}
        toggleSearch={vi.fn()}
        $isSearch
        searchValue=""
        handleSearch={vi.fn()}
        isSearchError={false}
      />
    )

    expect(screen.getByTestId('inputSearch')).toBeInTheDocument()
  })
  it('renders cancel button when in search mode', () => {
    render(
      <Search
        resourcesData={[]}
        toggleSearch={vi.fn()}
        $isSearch
        searchValue=""
        handleSearch={vi.fn()}
        isSearchError={false}
      />
    )
    const cancelSearchButton = screen.getByTestId('cancelSearchButton')
    expect(cancelSearchButton).toBeInTheDocument()
  })
  it('calls handleSearch when in search mode', () => {
    const handleSearch = vi.fn()
    render(
      <Search
        resourcesData={[]}
        toggleSearch={vi.fn()}
        $isSearch
        searchValue=""
        handleSearch={handleSearch}
        isSearchError={false}
      />
    )
    const inputSearch = screen.getByTestId('inputSearch')
    fireEvent.change(inputSearch, { target: { value: 'test' } })
    expect(handleSearch).toHaveBeenCalledWith('test')
  })
  it('calls toggleSearch when cancel button is clicked', () => {
    const toggleSearch = vi.fn()
    render(
      <Search
        resourcesData={[]}
        toggleSearch={toggleSearch}
        $isSearch
        searchValue=""
        handleSearch={vi.fn()}
        isSearchError={false}
      />
    )
    const cancelSearchButton = screen.getByTestId('cancelSearchButton')
    fireEvent.click(cancelSearchButton)
    expect(toggleSearch).toHaveBeenCalled()
  })

  it('displays search results count when searchValue is present', () => {
    const mockedResourcesData: TResource[] = [
      {
        id: '1',
        title: 'Resource Test',
        slug: 'resource-test',
        description: 'Resource test description',
        url: 'http://www.example.com/resourceTest',
        createdAt: '2023-01-01T12:00:00Z',
        updatedAt: '2023-01-02T12:00:00Z',
        user: {
          name: 'Author Name',
          avatarId: 'avatar.jpg',
        },
        voteCount: {
          upvote: 5,
          downvote: 2,
          total: 3,
          userVote: 1,
        },
        resourceType: 'Tipo 1',
        topics: [],
        isFavorite: true,
      },
    ]
    render(
      <Search
        resourcesData={mockedResourcesData}
        toggleSearch={vi.fn()}
        $isSearch
        searchValue="test"
        handleSearch={vi.fn()}
        isSearchError={false}
      />
    )

    const resultsCount = screen.getByText('Mostrant 1 resultat per "test"')
    expect(resultsCount).toBeInTheDocument()
  })
  it('does not display search results count when searchValue is empty', () => {
    render(
      <Search
        resourcesData={[]}
        toggleSearch={vi.fn()}
        $isSearch
        searchValue=""
        handleSearch={vi.fn()}
        isSearchError
      />
    )

    const resultsCount = screen.queryByText('Mostrando')
    expect(resultsCount).toBeNull()
  })
})
