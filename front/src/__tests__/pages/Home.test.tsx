import { Home } from '../../pages'
import { resources } from '../../pages/Home'
import { fireEvent, render, screen } from '../test-utils'

describe('HomePage', () => {
  it.skip('renders correctly', () => {
    render(<Home />)
  })

  it('detects search-resource input & input change', () => {
    render(<Home />)

    const inputSearch = screen.getByTestId<HTMLInputElement>('inputGroupSearch')
    expect(inputSearch).toBeInTheDocument()

    const initialResources = resources
    const cardResourcesNoSearch = screen.getAllByTestId('cardResource')
    expect(cardResourcesNoSearch).toHaveLength(initialResources.length)

    // Filter results
    fireEvent.change(inputSearch, { target: { value: 'javascript' } })
    expect(inputSearch.value).toBe('javascript')

    const filteredItems = resources.filter((resource) =>
      resource.title.toLowerCase().includes('javascript')
    )
    const cardResources = screen.getAllByTestId('cardResource')
    expect(cardResources).toHaveLength(filteredItems.length)
  })
})
