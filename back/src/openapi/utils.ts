import {
  extendZodWithOpenApi,
  OpenAPIGenerator,
  OpenAPIRegistry,
} from '@asteasolutions/zod-to-openapi'
import { openapiVersion, generatorConfig } from './config'
import { z } from 'zod'
import * as yaml from 'yaml'
import * as fs from 'fs'

extendZodWithOpenApi(z) // This adds the .openapi() method to Zod types and needs to be called once at init

export const registry = new OpenAPIRegistry()

export function writeDocumentation() {
  const generator = new OpenAPIGenerator(registry.definitions, openapiVersion)
  const docs = generator.generateDocument(generatorConfig)
  const fileContent = yaml.stringify(docs)
  fs.writeFileSync(`${__dirname}/openapi-docs.yml`, fileContent, {
    encoding: 'utf-8',
  })
}
