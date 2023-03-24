import { OpenAPIGenerator } from '@asteasolutions/zod-to-openapi'
import { registry } from './registry'
import { openapiVersion, generatorConfig, openapiFilename } from './config'
import * as yaml from 'yaml'
import * as fs from 'fs'
import './routes'

export function generateOpenapiFile() {
  const generator = new OpenAPIGenerator(registry.definitions, openapiVersion)
  const docs = generator.generateDocument(generatorConfig)
  const fileContent = yaml.stringify(docs)
  fs.writeFileSync(openapiFilename, fileContent, {
    encoding: 'utf-8',
  })
}
