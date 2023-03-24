import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import Koa from 'koa'
import cors from '@koa/cors'
// import helmet from 'koa-helmet'
import { HttpMethodEnum, koaBody } from 'koa-body'
import * as Routes from './routes'
import { appConfig } from './config/config'
import { errorMiddleware } from './middleware'
import { generateOpenapiFile } from './openapi/generateFile'
import yamljs from 'yamljs'
import { openapiFilename } from './openapi/config'
import { koaSwagger } from 'koa2-swagger-ui'

dotenv.config()

const app = new Koa()

app.use(cors())
// app.use(helmet())  // TODO: HELMET BREAKS SWAGGER-UI RENDER
app.use(
  koaBody({
    parsedMethods: [
      HttpMethodEnum.POST,
      HttpMethodEnum.PUT,
      HttpMethodEnum.PATCH,
      HttpMethodEnum.DELETE,
    ],
  })
)
app.use(errorMiddleware)

// Routes
app.use(Routes.authRouter)

// Swagger UI
generateOpenapiFile()
const spec = yamljs.load(openapiFilename)
app.use(koaSwagger({routePrefix: '/api-docs', swaggerOptions: { spec } }))

app.listen(appConfig.port, () => {
  console.log(`🚀 Server ready at http://localhost:${appConfig.port}`)
})

export { app }
