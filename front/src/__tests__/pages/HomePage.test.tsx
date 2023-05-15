import { Home } from '../../pages'
import { resources } from '../../pages/Home'
import { render } from '../test-utils'

describe('HomePage', () => {
  it('renders correctly', () => {
    render(<Home />)
  })

  it('filters items when the user search', () => {
    // Encontrar el buscador
    // Escribir en el buscador
    // Comprobar que inicialmente estan todos los elementos
    // Comprobar que cuando el usuario escribe solo estan los elementos que coinciden con su busqueda
    const { getByText } = render(<Home />)
    const filteredItems = resources.filter((resource) =>
      resource.title.toLowerCase().includes('javascript')
    )
    expect(filteredItems).toBeInTheDocument()
    filteredItems.forEach((resource) =>
      expect(getByText(resource.title)).toBeInTheDocument()
    )
  })
})
