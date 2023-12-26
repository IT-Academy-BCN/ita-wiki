import type { Preview } from "@storybook/react";
import i18n from '../src/i18n';
const preview: Preview = {
  globals: {
    locale: 'cat',
    locales: {
      en: 'English',
      cat: 'Catalán',
      es: 'Español',
    },
  },
  parameters: {
    i18n,
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
