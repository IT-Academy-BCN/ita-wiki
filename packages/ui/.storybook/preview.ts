import type { Preview } from "@storybook/react";
import { device } from "../src/styles/mediaQueries";

import { withRouter } from "storybook-addon-react-router-v6";

const preview: Preview = {
  globals: {
 
  },
  parameters: {
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
