import { TSsoGetItinerariesResponse } from '../../schemas/sso/ssoGetItineraries'
import { ServiceUnavailable } from '../errors'
import { pathSso } from './pathSso'

export async function getItineraries() {
  const fetchSSO = await fetch(pathSso.getItineraries, {
    method: 'GET',
  })

  const fetchData = (await fetchSSO.json()) as TSsoGetItinerariesResponse

  if (fetchSSO.status === 200) {
    return fetchData
  }
  throw new ServiceUnavailable()
}
