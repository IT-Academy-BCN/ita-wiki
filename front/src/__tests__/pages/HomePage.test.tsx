import { Home } from '../../pages'
import { resources } from '../../pages/Home'
import { fireEvent, render, screen } from '../test-utils'

describe('HomePage', () => {
  it.skip('renders correctly', () => {
    render(<Home />)
  })

  it('detects search-resource input & input change', () => {
    render(<Home />)

    // Encontrar el buscador
    const inputSearch = screen.getByTestId<HTMLInputElement>('inputGroupSearch')
    expect(inputSearch).toBeInTheDocument()

    // Escribir en el buscador
    fireEvent.change(inputSearch, { target: { value: 'javascript' } })
    expect(inputSearch.value).toBe('javascript')
  })

  it.skip('filters items when the user search', () => {
    render(<Home />)

    // Comprobar que inicialmente estan todos los elementos
    const cardResourcesNoSearch = screen.getAllByTestId('cardResource')
    expect(cardResourcesNoSearch).toBeInTheDocument()
    expect(cardResourcesNoSearch.length).toBe(resources.length)

    // Comprobar que cuando el usuario escribe solo estan los elementos que coinciden con su busqueda
    const filteredItems = resources.filter((resource) =>
      resource.title.toLowerCase().includes('javascript')
    )
    const cardResources = screen.getAllByTestId('cardResource')
    expect(cardResources).toBeInTheDocument()
    expect(cardResources.length).toBe(filteredItems.length)
  })
})
