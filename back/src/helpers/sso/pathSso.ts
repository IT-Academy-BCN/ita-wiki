import { appConfig } from '../../config/config'

export const pathSso = {
  login: `${appConfig.ssoUrl}/api/v1/auth/login`,
  register: `${appConfig.ssoUrl}/api/v1/auth/register`,
  validate: `${appConfig.ssoUrl}/api/v1/tokens/validate`,
  getUser: `${appConfig.ssoUrl}/api/v1/user`,
  getItineraries: `${appConfig.ssoUrl}/api/v1/itinerary`,
}
