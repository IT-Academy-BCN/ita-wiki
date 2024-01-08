import type { Preview } from "@storybook/react";
import { device } from "../src/styles/mediaQueries";

import i18n from '../src/i18n';
import { withRouter } from "storybook-addon-react-router-v6";

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
    viewport: { viewports: device },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [withRouter],


};

export default preview;
