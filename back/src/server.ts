import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import Koa from 'koa'
import cors from '@koa/cors'
import helmet from 'koa-helmet'
import { HttpMethodEnum, koaBody } from 'koa-body'
import { appConfig } from './config/config'
import { errorMiddleware } from './middleware'
import * as Routes from './routes'

dotenv.config()

const app = new Koa()

app.use(cors())
app.use(helmet())
app.use(
  koaBody({
    parsedMethods: [
      HttpMethodEnum.POST,
      HttpMethodEnum.PUT,
      HttpMethodEnum.PATCH,
      HttpMethodEnum.DELETE
    ]
  })
)
app.use(errorMiddleware)

// Routes
app.use(Routes.authRouter.routes())

app.listen(appConfig.port, () => {
  console.log(`🚀 Server ready at http://localhost:${appConfig.port}`)
})

export { app }
