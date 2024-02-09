import { appConfig } from '../../config/config'

export const pathSso = {
  v1: {
    auth: {
      login: `${appConfig.ssoUrl}/api/v1/auth/login`,
      register: `${appConfig.ssoUrl}/api/v1/auth/register`,
    },
    tokens: {
      validate: `${appConfig.ssoUrl}/api/v1/tokens/validate`,
    },
    user: `${appConfig.ssoUrl}/api/v1/user`,
    users: {
      base: `${appConfig.ssoUrl}/api/v1/users`,
      me: `${appConfig.ssoUrl}/api/v1/users/me`,
    },
    itineraries: `${appConfig.ssoUrl}/api/v1/itineraries`,
  },
}
