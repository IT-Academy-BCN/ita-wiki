import supertest from 'supertest'
import { pathRoot } from '../../routes/routes'
import { server } from '../globalSetup'

export async function dashboardLoginAndGetToken(
  dni: string,
  password: string
): Promise<string> {
  const loginRoute = `${pathRoot.v1.dashboard.auth}/login`
  const response = await supertest(server)
    .post(loginRoute)
    .send({ dni, password })
  const [authCookie] = response.header['set-cookie'][0].split(';')
  return authCookie
}
