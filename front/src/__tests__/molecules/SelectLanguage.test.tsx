import { render, screen, fireEvent } from '../test-utils'
import {SelectLanguage} from '../../components/molecules'

describe('LanguageSelector', () => {
    test('should render the component and handle language change', () => {
      render(<SelectLanguage />);
  
      const dropdown = screen.getByRole('combobox');
      expect(dropdown).toBeInTheDocument();
  
      expect(dropdown).toHaveValue('es');
  
      fireEvent.change(dropdown, { target: { value: 'cat' } });
  
      expect(dropdown).toHaveValue('cat');
    });
  });