
type openapiVersionType =  "3.0.0" | "3.0.1" | "3.0.2" | "3.0.3" | "3.1.0";
export const openapiVersion: openapiVersionType = '3.0.0'

export const generatorConfig = {
  info: {
    version: '1.0.0',
    title: 'My API',
    description: 'This is the API',
  },
  servers: [{ url: 'v1' }],
}
