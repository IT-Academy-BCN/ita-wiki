type OpenVersionType = '3.0.0' | '3.0.1' | '3.0.2' | '3.0.3' | '3.1.0'
export const openapiVersion: OpenVersionType = '3.0.0'

export const openapiFilename = 'openapi.yaml'

export const generatorConfig = {
  info: {
    version: '0.8.0',
    title: 'IT Academy Wiki',
    description:
      "Our app implements a Wiki to be used as a knowledge base by the students of the Barcelona Activa's IT Academy",
  },
  // servers: [{ url: 'v1' }]
}

export const swaggeruiUrl = `/api/v1/api-docs`
