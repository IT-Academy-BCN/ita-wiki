/* eslint-disable import/no-extraneous-dependencies */
import {
  generateSchemaTypes,
  generateReactQueryComponents,
} from '@openapi-codegen/typescript'
import { defineConfig } from '@openapi-codegen/cli'

export default defineConfig({
  openapi: {
    from: {
      source: 'url',
      url: 'https://dev.api.itawiki.eurecatacademy.org/api/v1/api-docs/openapi.yaml',
    },
    outputDir: 'src/openapi',
    to: async (context) => {
      const filenamePrefix = 'openapi'
      const { schemasFiles } = await generateSchemaTypes(context, {
        filenamePrefix,
      })
      await generateReactQueryComponents(context, {
        filenamePrefix,
        schemasFiles,
      })
    },
  },
})
