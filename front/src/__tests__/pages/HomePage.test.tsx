import { Home } from '../../pages'
import { resources } from '../../pages/Home'
import { fireEvent, render } from '../test-utils'

describe('HomePage', () => {
  it('renders correctly', () => {
    render(<Home />)
  })

  it('detects search-resource input & input change', () => {
    const { getByTestId } = render(<Home />)

    // Encontrar el buscador
    const inputSearch = getByTestId('search-resource')
    expect(inputSearch).toBeInTheDocument()

    // Escribir en el buscador
    fireEvent.change(inputSearch, { target: { value: 'javascript' } })
    expect(inputSearch.value).toBe('javascript')
  })

  it('filters items when the user search', () => {
    const { getAllByTestId } = render(<Home />)

    // Comprobar que inicialmente estan todos los elementos
    const filteredItemsNoSearch = resources.filter((resource) =>
      resource.title.toLowerCase().includes('')
    )
    const cardResourcesNoSearch = getAllByTestId('card-resource')
    expect(cardResourcesNoSearch).toBeInTheDocument()
    expect(cardResourcesNoSearch.length).toBe(filteredItemsNoSearch.length)

    // Comprobar que cuando el usuario escribe solo estan los elementos que coinciden con su busqueda
    const filteredItems = resources.filter((resource) =>
      resource.title.toLowerCase().includes('javascript')
    )
    const cardResources = getAllByTestId('card-resource')
    expect(cardResources).toBeInTheDocument()
    expect(cardResources.length).toBe(filteredItems.length)
  })
})
