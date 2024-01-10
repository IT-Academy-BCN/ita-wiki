type OpenVersionType = '3.0.0' | '3.0.1' | '3.0.2' | '3.0.3' | '3.1.0'
export const openapiVersion: OpenVersionType = '3.0.0'

export const openapiFilename = 'openapi.yaml'

export const generatorConfig = {
  info: {
    version: '1.5.0',
    title: 'IT Academy SSO Service',
    description:
      'This is an SSO service that is used accross all ITA services.',
  },
  // servers: [{ url: 'v1' }]
}

export const swaggeruiUrl = `/api/v1/api-docs`
