import { render, screen, fireEvent } from '../test-utils'
import { SelectLanguage } from '../../components/molecules'

describe('LanguageSelector', () => {
  test('should render the component and handle language change', () => {
    render(<SelectLanguage />)

    const dropdown = screen.getByRole('combobox')
    expect(dropdown).toBeInTheDocument()

    expect(dropdown).toHaveValue('cat')

    fireEvent.change(dropdown, { target: { value: 'es' } })

    expect(dropdown).toHaveValue('es')
  })
})
