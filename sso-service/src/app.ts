import 'dotenv/config'
import Koa from 'koa'
import cors from '@koa/cors'
import helmet from 'koa-helmet'
import { HttpMethodEnum, koaBody } from 'koa-body'
// import yamljs from 'yamljs'
// import { koaSwagger } from 'koa2-swagger-ui'
import * as Routes from './routes'
// import { errorMiddleware } from './middleware'
// import { generateOpenapiFile } from './openapi/generateFile'
// import { openapiFilename, swaggeruiUrl } from './openapi/config'
// import { swaggeruiCSPMiddleware } from './middleware/swaggeruiCSPMiddleware'
import { appConfig } from './config/index'

const app = new Koa()

app.use(cors())
app.use(helmet())
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
// app.use(errorMiddleware)

// Routes
app.use(Routes.authRoutes.routes())
app.use(Routes.userRoutes.routes())

// Swagger UI
// app.use(swaggeruiCSPMiddleware)
// generateOpenapiFile()
// const spec = yamljs.load(openapiFilename)
// app.use(koaSwagger({ routePrefix: swaggeruiUrl, swaggerOptions: { spec } }))

// Only listen if launched from terminal
// eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle
if (process.env.NODE_ENV !== 'test') {
  app.listen(appConfig.port, () => {
    // eslint-disable-next-line no-console
    console.log(`🚀 Server ready at http://localhost:${appConfig.port}`)
  })
}
export { app }
