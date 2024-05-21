import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { I18nextProvider } from 'react-i18next'
import { SelectLanguage } from '../../components/molecules/SelectLanguage'
import i18n from '../../i18n'

type StorageMock = {
  [key: string]: string
}

describe('SelectLanguage', () => {
    const originalLocalStorage = global.localStorage;
  
    beforeAll(() => {
      const localStorageMock = (function localStorageMock() {
        let store: StorageMock = {};
        return {
          getItem(key: string) {
            return store[key] || null;
          },
          setItem(key: string, value: string): void {
            store[key] = value.toString();
          },
          clear(): void {
            store = {};
          },
        };
      })();
      Object.defineProperty(window, 'localStorage', {
        value: localStorageMock,
      });
    });
  
    beforeEach(() => {
      window.localStorage.setItem('lng', 'cat');
      render(
        <I18nextProvider i18n={i18n}>
          <SelectLanguage />
        </I18nextProvider>
      );
    });
  
    afterAll(() => {
      Object.defineProperty(window, 'localStorage', {
        value: originalLocalStorage,
      });
    });
  
    test('contains the correct language options', () => {
      const options = screen
        .getAllByRole('option')
        .map((option) => (option as HTMLOptionElement).value);
      expect(options).toContain('cat');
      expect(options).toContain('es');
      expect(options).toContain('en');
    });
  
    test('renders with the correct initial language', () => {
      expect(screen.getByRole('combobox')).toHaveValue('cat');
    });
  
    test('changes language when a different option is selected', () => {
      fireEvent.change(screen.getByRole('combobox'), { target: { value: 'en' } });
      expect(window.localStorage.getItem('lng')).toBe('en');
      expect(screen.getByRole('combobox')).toHaveValue('en');
    });
  });