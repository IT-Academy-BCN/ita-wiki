import { render, screen, fireEvent } from '../test-utils'
import {LanguageSelector} from '../../components/molecules'

describe('LanguageSelector', () => {
    test('should render the component and handle language change', () => {
      render(<LanguageSelector />);
  
      const dropdown = screen.getByRole('combobox');
      expect(dropdown).toBeInTheDocument();
  
      expect(dropdown).toHaveValue('esp');
  
      fireEvent.change(dropdown, { target: { value: 'cat' } });
  
      expect(dropdown).toHaveValue('cat');
    });
  });